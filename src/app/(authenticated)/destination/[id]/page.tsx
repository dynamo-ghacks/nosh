import React from "react";
import { DefaultUser, getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/options";
import { getDestination } from "./actions/destination.action";
import { notFound } from "next/navigation";
import { DestinationDetailPage } from "./components/destination-detail-page";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = (await getServerSession(authOptions)) as {
    user?: DefaultUser & { tags: string[] };
  } | null;

  const data = await getDestination(params.id);

  if (!data.success || !data.data?.destination?.data) {
    notFound();
  }

  const detail = data.data.destination.data;

  return (
    <DestinationDetailPage
      detail={detail}
      user={session?.user!!}
      userReview={data.data.userReview}
    />
  );
}
