import fs from "fs";
import path from "path";
import archiver from "archiver";
import { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const folderPath = path.join(process.cwd(), "public", "generated-files");

    const { htmlCode, cssCode, jsCode } = JSON.parse(req.body) as RequestBody;
    const formattedHtmlCode = handleHtmlCode(htmlCode);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(path.join(folderPath, "index.html"), formattedHtmlCode);

    fs.writeFileSync(path.join(folderPath, "styles.css"), cssCode);

    fs.writeFileSync(path.join(folderPath, "script.js"), jsCode);

    const zipPath = path.join(folderPath, "files.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", function () {
      fs.readFile(zipPath, (err, data) => {
        if (err) {
          res.status(500).json({ error: "Failed to read the zip file" });
          return;
        }
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=files.zip");
        res.setHeader("Content-Length", data.length);
        res.status(200).send(data);
      });
    });

    archive.on("error", function (err) {
      res.status(500).json({ error: "Failed to create the zip file" });
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

function handleHtmlCode(htmlCode: string): string {
  let formatedCode = `<!doctypehtml><html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Document</title><link href=styles.css rel=stylesheet>${htmlCode}<script src=script.js></script>`;
  return formatedCode;
}
