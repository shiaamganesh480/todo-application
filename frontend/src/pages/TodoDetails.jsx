import { useSearchParams } from "react-router-dom";

function TodoDetails() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  return (
    <div>
      <h1>Todo Details</h1>
      <h2>{id}</h2>
    </div>
  );
}

export default TodoDetails;