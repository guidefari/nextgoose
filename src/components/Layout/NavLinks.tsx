import { RSS } from "@/components/RSS";
import { TfiYoutube } from "react-icons/tfi";
import { FileTextIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { BiSolidCameraHome } from "react-icons/bi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { IoIosMailOpen } from "react-icons/io";
import { PiVinylRecordLight } from "react-icons/pi";
import { SiWritedotas } from "react-icons/si";

type shit = {
  name: string;
  slug?: string;
  external?: { link: string };
  icon: React.ReactNode;
  CustomComponent?: React.JSX.Element;
};

const iconSytles = "h-5 w-5 transition-all group-hover:scale-110";

export const pagesAndPages: shit[] = [
  {
    name: "Words",
    slug: "/words",
    icon: <SiWritedotas className={iconSytles} />,
  },
  {
    name: "Not Tweets👀",
    slug: "/micro",
    icon: (
      <div className="flex text-sm gap-1 items-center -ml-4 sm:ml-0">
        !<TwitterLogoIcon className={iconSytles} />
      </div>
    ),
  },
  {
    name: "Record Labels",
    slug: "/labels",
    icon: <BiSolidCameraHome className={iconSytles} />,
  },
  {
    name: "Mixes",
    slug: "/mixes",
    icon: <PiVinylRecordLight className={iconSytles} />,
  },
  {
    name: "!Newsletter",
    slug: "/newslater",
    icon: <IoIosMailOpen className={iconSytles} />,
  },
  {
    icon: <GiPerspectiveDiceSixFacesRandom className={iconSytles} />,
    name: "RSP",
    slug: "/rsp",
  },
  {
    icon: <FileTextIcon className={iconSytles} />,
    name: "Mixes via RSS",
    CustomComponent: <RSS />,
  },
  {
    icon: <FileTextIcon className={iconSytles} />,
    name: "Mixes via Youtube",
    CustomComponent: <a href="https://youtube.com/@goosebumpsfm" className="text-inherit">
      <TfiYoutube />
    </a>,
  },
];
