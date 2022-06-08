import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export const content_databaseId = process.env.SANGHAASPAT_CONTENT_DATABASE_ID;

export const getDatabase = async (content_databaseId) => {
    const response = await notion.databases.query({
        database_id: content_databaseId,
    });
    return response.results;
};

export const getPage = async (pageId) => {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
};

export const getBlocks = async (blockId) => {
    const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    });
    return response;
};
