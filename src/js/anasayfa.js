import "./main";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, `.env`) });
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.retrieve({ database_id: databaseId });
    console.log(response);
})();
