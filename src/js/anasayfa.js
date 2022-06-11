import "./main";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.retrieve({ database_id: databaseId });
    console.log(response);
})();
