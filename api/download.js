// api/download.js

export default async function handler(req, res) {

  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Instagram URL required"
    });
  }

  try {

    const response = await fetch(
      "https://api.apify.com/v2/acts/apify~instagram-downloader/run-sync-get-dataset-items?token=" +
      process.env.APIFY_TOKEN,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          directUrls: [url]
        })
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }
}
