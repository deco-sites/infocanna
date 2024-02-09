export interface PropsLoad {
    post_id: string;
}

export interface PostResponse {
    _id: string;
    category: string;
    content: string;
    images: Image[];
  }
  
  interface Image {
    _id: string;
    raw: string;
    full: string;
    thumb: string;
  }
  
  const url =
    "https://localhost:3000/posts/";
  
  
  const loader = async (
    props: PropsLoad,
  ): Promise<PostResponse | null> => {
    const { post_id } = props;
    try {
      const response = (await fetch(
          url+post_id,
        ).then((r) => r.json())) as PostResponse;
      return response;
    } catch (e) {
      console.log({ err: e });
      return null;
    }
  };
  
  export default loader;
  