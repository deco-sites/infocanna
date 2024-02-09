import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { SectionProps } from "deco/types.ts";
import { PostResponse } from "$store/loaders/Blog/getPosts.ts";

export interface Props {
  title?: string;
  posts?: PostResponse[];
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
}

function BlogPosts({
  title = "BlogPosts",
  layout = {
    numberOfSliders: {
      mobile: 1,
      desktop: 3,
    },
    headerAlignment: "center",
    headerfontSize: "Normal",
    showArrows: false,
  } as Props["layout"],
  posts,
}: SectionProps<ReturnType<typeof loader>>) {
  const id = useId();

  if (!posts || posts.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  const Card = ({ post }: { post: PostResponse }) => (
    <a href={`/post/${post._id}`} class="block px-3">
      <article class="flex flex-col">
        <figure class="w-full">
          <Image
            class="w-full object-cover"
            src={post.images[0].thumb}
            alt={""}
            width={442}
            height={266}
          />
          <figcaption class="text-2xl mt-4 font-light">
            {post.category}
          </figcaption>
        </figure>
        <div class="flex flex-col gap-1">
          <p class="text-base font-light pb-14 pt-2">
            {post.content.slice(0, 140)}
          </p>
          <div class="flex items-center justify-between">
            <p class="font-light text-xs">
              Autor: Admin
            </p>
            <p class="font-light text-xs">{post.created_at}</p>
          </div>
        </div>
      </article>
    </a>
  );

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:pt-32 pb-16">
      <div class="px-9">
        <Header
          title={title || "BlogPosts"}
          fontSize={layout?.headerfontSize || "Normal"}
          alignment={layout?.headerAlignment || "center"}
        />
      </div>
      <div
        id={id}
        class={`grid ${
          layout?.showArrows ? "grid-cols-[48px_1fr_48px]" : ""
        } px-6 container`}
      >
        <Slider class="carousel carousel-center sm:carousel-end row-start-2 row-end-5">
          {posts?.map((post, index) => (
            <Slider.Item
              index={index}
              class={`carousel-item  ${
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3]
              } ${slideMobile[layout?.numberOfSliders?.mobile ?? 1]}`}
            >
              <Card post={post} />
            </Slider.Item>
          ))}
        </Slider>

        {layout?.showArrows && (
          <>
            <div class="relative block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronLeft" strokeWidth={3} class="w-5" />
              </Slider.PrevButton>
            </div>
            <div class="relative block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export const loader = (props: Props, req: Request) => {
  const { posts } = props;

  console.log({posts})

  return props;
};

export default BlogPosts;
