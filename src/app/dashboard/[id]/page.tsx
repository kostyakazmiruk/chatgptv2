"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import Chat from "~/components/chat/chat";

export default function Page({ params }) {
  console.log("params.id", params);
  const { id } = params;
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/*<div className="grid auto-rows-min gap-4 md:grid-cols-3">*/}
          {/*  <div className="aspect-video rounded-xl bg-muted/50" />*/}
          {/*  <div className="aspect-video rounded-xl bg-muted/50" />*/}
          {/*  <div className="aspect-video rounded-xl bg-muted/50" />*/}
          {/*</div>*/}
          {/*<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />*/}
          <Chat id={id} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
