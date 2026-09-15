import type { Metadata } from "next";
import { BookmarksList } from "@/components/bookmarks-list";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getSummaries } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Saved skills",
  description: "Skills you saved in this browser.",
  robots: { index: false },
};

export default function BookmarksPage() {
  return (
    <Container className="py-10">
      <PageHeader title="Saved skills" description="Saved in this browser only. Nothing is sent to a server." />
      <BookmarksList skills={getSummaries()} />
    </Container>
  );
}
