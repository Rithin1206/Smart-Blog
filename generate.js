import { Configuration, OpenAIApi } from "openai";  
import {writeFileSync} from 'fs';
import fs from 'fs';
import fetch from 'node-fetch';

const my_key = fs.readFileSync('./key.txt', 'utf8');

console.log(my_key)
const configuration = new Configuration({
    apiKey: my_key,
});

const openai = new OpenAIApi(configuration)

const prompt = "Generate an image of a cat wearing a top hat and monocle, sitting at a desk writing a letter with a quill pen."

const res = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024"
})

const url = res.data.data[0].url;

console.log(url)

const imgRes = await fetch(url)

const blob = await imgRes.blob();
const buffer = Buffer.from(await blob.arrayBuffer())
writeFileSync(`./images/${Date.now()}.png`, buffer)