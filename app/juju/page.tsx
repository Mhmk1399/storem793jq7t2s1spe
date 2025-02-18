"use client";
import { useEffect, useState } from "react";
import ImageText from "@/components/imageText";
import ContactForm from "@/components/contactForm";
import NewsLetter from "@/components/newsLetter";
import Banner from "@/components/banner";
import CollapseFaq from "@/components/collapseFaq";
import MultiColumn from "@/components/multiColumn";
import MultiRow from "@/components/multiRow";
import SlideShow from "@/components/slideShow";
import Video from "@/components/video";
import { Collection } from "@/components/collection";
import RichText from "@/components/richText";
import ProductList from "@/components/productList";
import { Story } from "@/components/story";
import Gallery from "@/components/gallery";
import { OfferRow } from "@/components/offerRow";
import { ProductsRow } from "@/components/productsRow";
import SlideBanner from "@/components/slideBanner";
import {
  BannerSection,
  CollapseSection,
  CollectionSection,
  ContactFormDataSection,
  GallerySection,
  ImageTextSection,
  MultiColumnSection,
  MultiRowSection,
  NewsLetterSection,
  OfferRowSection,
  ProductListSection,
  RichTextSection,
  SlideBannerSection,
  SlideSection,
  StorySection,
  VideoSection,
} from "@/lib/types";

type AllSections = 
  RichTextSection &
  BannerSection &
  ImageTextSection &
  VideoSection &
  ContactFormDataSection &
  NewsLetterSection &
  CollapseSection &
  MultiColumnSection &
  SlideSection &
  MultiRowSection &
  CollectionSection &
  StorySection &
  OfferRowSection &
  GallerySection &
  SlideBannerSection &
  ProductListSection;
  
  export default function Page() {
    const [data, setData] = useState<AllSections[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [orders, setOrders] = useState<string[]>([]);
  
   const componentMap = {
      RichText,
      Banner,
      ImageText,
      Video,
      ContactForm,
      NewsLetter,
      CollapseFaq,
      MultiColumn,
      SlideShow,
      MultiRow,
      ProductList,
      Collection,
      Story,
      OfferRow,
      Gallery,
      SlideBanner,
      ProductsRow,
    };
  
     useEffect(() => {
      const handleResize = async () => {
        const isMobileView = window.innerWidth < 430;
        setIsMobile(isMobileView);
  
        const currentRouteName = window.location.pathname.split("/")[1];
  
        const templateSuffix = isMobileView ? "sm" : "lg";
        const templatePath = `${currentRouteName}${templateSuffix}`;
  
        const template = await import(
          `../../public/template/${templatePath}.json`
        );
  
        const testData = template.default.children.sections;
  
        setData(testData);
        setOrders(template.default.children.order);
      };
         handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    
      if (!data) {
      return <div>Loading...</div>;
    }
      return (
      <div className="grid grid-cols-1 pt-4 px-1">
        {orders.map((componentName, index) => {
          const baseComponentName = componentName.split("-")[0];
          const Component =
            componentMap[baseComponentName as keyof typeof componentMap];
  
          return Component ? (
            <div key={componentName} style={{ order: index }} className="w-full">
              <Component
                sections={data}
                isMobile={isMobile}
                componentName={componentName}
              />
            </div>
          ) : null;
        })}
      </div>
    );
}