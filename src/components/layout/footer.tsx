import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Slack, Bug } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background py-5 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-evenly text-center">
        <ContactCol />
        <SocialMediaCol />
        <PartnershipCol />
      </div>
    </footer>
  );
}

function PartnershipCol() {
  return (
    <div className="flex min-h-full flex-col items-center justify-between px-4">
      <div>
        <h2 className="mb-3 text-2xl font-semibold">Samarbeid</h2>
        <Separator className={"mb-4"} />
        <ul>
          <li className="mb-4">
            <a href="https://vercel.com/?utm_source=kvark&utm_campaign=oss">
              <Image
                src="favicon.ico"
                alt="vercel"
                className="mr-2 inline h-5 w-5"
              />
              Powered by Vercel
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ContactCol() {
  return (
    <div className="px-4">
      <h2 className="mb-3 text-2xl font-semibold">Kontakt</h2>
      <Separator className={"mb-4"} />
      <ul className="text-sm font-medium md:text-base">
        <li className="mb-4">
          <span className="block">E-post</span>
          <p>hs@tihlde.org</p>
        </li>
        <li className="mb-4">
          <span className="block">Sted</span>
          <p>c/o IDI NTNU</p>
        </li>
        <li className="mb-4">
          <span className="block">Org. Nr.</span>
          <p>989 684 183</p>
        </li>
        <li className="mb-4 underline">
          <a href="https://tihlde.org/wiki/kontakt-oss/">Kontakt oss</a>
        </li>
      </ul>
    </div>
  );
}

function SocialMediaCol() {
  return (
    <div className="px-4">
      <h2 className="mb-3 text-2xl font-semibold">Sosiale medier</h2>

      <Separator className={"mb-4"} />

      <div className="flex place-content-center items-center gap-x-6 gap-y-4 md:flex md:justify-center md:gap-x-0 md:gap-y-0 md:space-x-4">
        <Link
          href="https://www.facebook.com/tihlde/"
          target="_blank"
          className="flex justify-center"
        >
          <Button variant={"outline"} size={"icon"}>
            <Facebook />
          </Button>
        </Link>

        <a
          href="https://www.instagram.com/tihlde/"
          target="_blank"
          className="flex justify-center"
        >
          <Button variant={"outline"} size={"icon"}>
            <Instagram />
          </Button>
        </a>

        <a
          href="https://twitter.com/tihlde"
          target="_blank"
          className="flex justify-center"
        >
          <Button variant={"outline"} size={"icon"}>
            <Twitter />
          </Button>
        </a>

        {/*  <a
          href="https://www.snapchat.com/add/tihldesnap"
          target="_blank"
          className="flex justify-center"
        >
          <Snapchat />
        </a>*/}

        <a
          href="https://www.facebook.com/tihlde/"
          target="_blank"
          className="flex justify-center"
        >
          <Button variant={"outline"} size={"icon"}>
            <Slack />
          </Button>
        </a>

        {/*  <a
          href="https://discord.com/invite/SZR9vTS"
          target="_blank"
          className="flex justify-center"
        >
          <Discord />
        </a>*/}
      </div>

      <PageErrorInfo />
    </div>
  );
}

function PageErrorInfo() {
  return (
    <div className="mt-20 flex w-fit items-center space-x-4 rounded-md border p-4">
      <Bug />
      <div className="flex-1 space-y-1 text-start">
        <p className="text-sm leading-none">Feil på siden?</p>
        <p className="text-sm font-medium underline">
          <Link
            href="https://tihlde.org/wiki/tihlde/undergrupper/index/"
            target="_blank"
          >
            Rapporter til index
          </Link>
        </p>
      </div>
    </div>
  );
}
