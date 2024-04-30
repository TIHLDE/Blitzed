import Link from 'next/link';
import { Facebook, Instagram, Twitter, Slack, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-background py-5 md:py-20">
      <div className="flex flex-wrap justify-evenly items-start max-w-6xl mx-auto text-center">
        <ContactCol />
        <SocialMediaCol />
        <PartnershipCol />
      </div>
    </footer>
  );
}

function PartnershipCol() {
  return (
    <div className="px-4 flex items-center flex-col justify-between min-h-full">
      <div>
        <h2 className="text-2xl font-semibold mb-3">Samarbeid</h2>
        <Separator />
        <ul>
          <li className="mb-4">
            <a href="https://vercel.com/?utm_source=kvark&utm_campaign=oss">
              <img
                src="/vercel.svg"
                alt="vercel"
                className="inline w-16 h-16"
              />
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
      <h2 className="text-2xl font-semibold mb-3">Kontakt</h2>
      <Separator className={'mb-4'} />
      <ul className="font-medium text-sm md:text-base">
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
      <h2 className="text-2xl font-semibold mb-3">Sosiale medier</h2>

      <Separator className={'mb-4'} />

      <div className="flex md:gap-x-0 md:gap-y-0 gap-x-6 gap-y-4 items-center md:flex md:justify-center md:space-x-4 place-content-center">
        <Link
          href="https://www.facebook.com/tihlde/"
          target="_blank"
          className="flex justify-center"
        >
          <Button variant={'outline'} size={'icon'}>
            <Facebook />
          </Button>
        </Link>

        <a
          href="https://www.instagram.com/tihlde/"
          target="_blank"
          className="flex justify-center"
        >
          <Button variant={'outline'} size={'icon'}>
            <Instagram />
          </Button>
        </a>

        <a
          href="https://twitter.com/tihlde"
          target="_blank"
          className="flex justify-center"
        >
          <Button variant={'outline'} size={'icon'}>
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
          <Button variant={'outline'} size={'icon'}>
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
    <div className="flex items-center w-fit space-x-4 rounded-md border p-4 mt-20">
      <Bug />
      <div className="flex-1 space-y-1 text-start">
        <p className="text-sm leading-none">Feil på siden?</p>
        <p className="text-sm underline font-medium">
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
