import Image from "next/image";
import faceBook from '@/public/icons/facebook.svg';
import discord from '@/public/icons/discord.svg';
import slack from '@/public/icons/slack.svg';
import twitter from '@/public/icons/twitter.svg';
import instagram from '@/public/icons/instagram.svg';
import snapchat from '@/public/icons/snapchat.svg';
import vercel from '@/public/icons/vercel_background.svg';

export default function Footer() {
    return (

<footer className="bg-[rgb(1,24,48)] text-white py-5 md:py-20">
  <div className="flex flex-wrap justify-between max-w-6xl mx-auto text-center">

    <div className="w-full px-4 md:w-1/3 md:px-10 mb-10 pt-5">
        <h2 className="text-2xl font-semibold uppercase mb-3">Kontakt</h2>
         <hr className="isolate ms-10 me-10 border-1 border-white mb-6"/>
          <ul className="font-medium text-sm md:text-base">
            <li className="mb-4">
                <span className="block">EPOST</span>
                <p>hs@tihlde.org</p>
            </li>
            <li className="mb-4">
              <span className="block">LOKASJON</span>
              <p>c/o IDI NTNU</p>
            </li>
            <li className="mb-4">
              <span className="block">ORGANISASJONSNUMMER</span>
              <p>989 684 183</p>
            </li>
            <li className="mb-4 underline">
              <a href="https://tihlde.org/wiki/kontakt-oss/">Kontakt oss</a>
            </li>
          </ul>
    </div>

    <div className="w-full px-5 md:w-1/3 md:px-10 mb-10 pb-5">
        <h2 className="text-2xl font-semibold uppercase mb-3">Samarbeid</h2>
          <hr className="isolate ms-10 me-10 border-1 border-white mb-6"/>
          <ul>
          <li className="mb-4">
            <a href="https://vercel.com/?utm_source=kvark&utm_campaign=oss">
              <Image width={200} height={200} src={vercel} alt="vercel" className="inline w-9 h-9 mr-2" />Powered by Vercel
            </a>
          </li>
        </ul>
    </div>

    <div className="w-full md:w-1/3 md:p-10">
        <h2 className="text-2xl font-semibold uppercase mb-3">Sosiale medier</h2>
        <hr className="isolate ms-10 me-10 border-1 border-white mb-6"/>
        <div className="grid grid-cols-[auto,auto,auto] md:gap-x-0 md:gap-y-0 gap-x-6 gap-y-4 items-center md:flex md:justify-center md:space-x-4 place-content-center">

          <a href="https://www.facebook.com/tihlde/" target="_blank" className="flex justify-center">
            <Image width={80} height={80} src={faceBook} alt="facebook" className="w-9 h-9 sm:g-x-2"/></a>

          <a href="https://www.instagram.com/tihlde/" target="_blank" className="flex justify-center">
            <Image width={80} height={80} src={instagram} alt="instagram" className="w-9 h-9"/></a>

          <a href="https://twitter.com/tihlde" target="_blank" className="flex justify-center">
            <Image width={80} height={80} src={twitter} alt="twitter" className="w-9 h-9"/></a>

          <a href="https://www.snapchat.com/add/tihldesnap" target="_blank" className="flex justify-center">
            <Image width={80} height={80} src={snapchat} alt="snapchat" className="w-9 h-9"/></a>

          <a href="https://www.facebook.com/tihlde/" target="_blank" className="flex justify-center">
            <Image width={80} height={80} src={slack} alt="slack" className="w-9 h-9"/></a>

          <a href="https://discord.com/invite/SZR9vTS" target="_blank" className="flex justify-center">
            <Image width={80} height={80} src={discord} alt="discord" className="w-9 h-9"/></a>

        </div>
    </div>

    <div className="w-full px-20 md:w-full md:px-4 pt-8">
        <p>Feil på siden? <a href="https://tihlde.org/wiki/tihlde/undergrupper/index/" target="_blank" className="underline">Rapporter til index</a></p>
    </div>

 </div>
</footer>
  );
}

