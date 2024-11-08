import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";

import { Suspense } from "react";

export default async function SinglePostPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <Suspense fallback="Loading...">
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}
