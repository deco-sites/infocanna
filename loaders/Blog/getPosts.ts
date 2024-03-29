export interface PostResponse {
  _id: string;
  category: string;
  content: string;
  images: Image[];
  created_at: Date;
}

export interface Image {
  _id: string;
  raw: string;
  full: string;
  thumb: string;
}

const url = "http://localhost:3000/posts";

const loader = async (): Promise<PostResponse[] | null> => {
  try {
    const response = (await fetch(url).then((r) => r.json())) as PostResponse[];
    return response;
  } catch (e) {
    console.log({ err: e });
    return null;
  }
};

export default loader;
