import { useQuery } from "@tanstack/react-query";
import getData from "./getData";
import { StudentClass } from "@/types";

export default function useStudentClass() {
  const query = useQuery({
    queryKey: ["student_class"],
    queryFn: () => getData<StudentClass>("/students/classes"),
  });

  return query;
}
