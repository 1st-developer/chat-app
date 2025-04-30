-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_to_user_Id_fkey" FOREIGN KEY ("to_user_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
