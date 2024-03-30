import { redirect } from "next/navigation";

/*
If the user navigates to any other url besides /planets, /planets/:id or /favorites, then this route will be rendered which redirects user to the default "/" route.
*/
export default async function NotFound() {
  redirect("/");
}
