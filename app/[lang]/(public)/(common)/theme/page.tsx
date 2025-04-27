import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { ProfileForm } from "./_components";
import DemoPage from "@/components/ui/custom-table/DemoTable";
import ThemeControl from "@/components/ui/theme-control/ThemeControl";

const domain = process.env.NEXT_PUBLIC_DOMAIN;
if (!domain) {
  throw new Error("NEXT_PUBLIC_DOMAIN is not defined");
}

export default function Page() {
  return (
    <div className="mt-[100px]">
      <h2>Theme control</h2>
      <ThemeControl />
      <hr className="my-10" />
      <h2 className="mb-3">Buttons</h2>
      <Button variant={"default"} className="mr-3">
        default
      </Button>
      <Button variant={"destructive"} className="mr-3">
        destructive
      </Button>
      <Button variant={"ghost"} className="mr-3">
        ghost
      </Button>
      <Button variant={"link"} className="mr-3">
        link
      </Button>
      <Button variant={"outline"} className="mr-3">
        outline
      </Button>
      <Button variant={"secondary"} className="mr-3">
        secondary
      </Button>
      <hr className="my-6" />
      <div className="card-gradient p-6 max-w-[300px]">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK2EWpKO3dUcwZ2sJS42qFm78RFYcm1T-5Q&s"
          alt="card image"
          width={300}
          height={200}
          className="mb-3"
        />
        <div className="flex items-center gap-2 mb-3">
          <Button>Tag 1</Button>
          <Button>Tag 2</Button>
          <Button>Tag 3</Button>
        </div>
        <h3 className="mb-3">Card Title</h3>
        <p className="line-clamp-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          accusantium ipsum iste? Beatae, eaque architecto tenetur sit labore
          obcaecati consectetur dignissimos quas fuga nostrum dicta quaerat
          quidem corrupti ipsam iste.
        </p>
      </div>
      <hr className="my-6" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <hr className="my-10" />
      <div className="w-1/3">
        <ProfileForm />
      </div>
      <hr className="my-10" />
      <h2>Table</h2>
      <DemoPage />
    </div>
  );
}
