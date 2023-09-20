import axios from "axios";
import { type User } from "@/types";

const myAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users/",
});

async function getUserByIdOrName(value: number | string) {
  if (Number(value)) {
    const { data }: { data: User[] } = await myAxios.get(`?id=${value}`);

    return data;
  } else {
    const { data }: { data: User[] } = await myAxios.get(`?name=${value}`);

    return data;
  }
}

async function getUserById(value: number) {
  const { data }: { data: User } = await myAxios.get(`${value}`);

  return data;
}

export { getUserByIdOrName, getUserById };
