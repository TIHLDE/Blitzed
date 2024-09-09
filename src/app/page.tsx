import HeroCard from "~/components/hero";

export default function Home() {
  return (
    <div className={"h-[90vh] flex-row justify-between md:flex"}>
      <div className="relative z-10 flex-col px-4 md:flex md:h-full md:basis-2/5 md:items-center md:justify-center md:bg-accent">
        <HeroCard />
      </div>
      <div className="z-0 h-full md:w-full md:basis-3/5">
        <img
          src={
            "https://images.unsplash.com/photo-1558383409-ab7ef8db3e01?q=80&w=1786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className={"h-full w-full object-cover"}
          alt={"People sharing drinks"}
        />
      </div>
    </div>
  );
}
