/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_user_Id_fkey";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "to_user_Id" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
