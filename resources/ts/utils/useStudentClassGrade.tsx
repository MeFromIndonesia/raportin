import useStudentClass from "@/libs/apis/useStudentClass";

export default function useStudentClassGrade(id: number) {
  const { data, ...query } = useStudentClass();
  const studentClasses = data?.data;

  const studentClass = studentClasses?.find((value) => value.id === id);

  return { grade: studentClass?.grade, major: studentClass?.major, ...query };
}
