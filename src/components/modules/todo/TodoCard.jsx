import { Button, Card, CardBody } from "@nextui-org/react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const TodoCard = ({ items, handleEditTodo, handleDeleteTodo }) => {
  return (
    <>
      <Card>
        <CardBody>
          <div className="flex items-center justify-between gap-5">
            <p>{items?.todo}</p>
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                radius="full"
                variant="flat"
                color="primary"
                onClick={handleEditTodo}
              >
                <AiOutlineEdit fontSize={24} />
              </Button>
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                radius="full"
                onClick={handleDeleteTodo}
              >
                <AiOutlineDelete fontSize={24} />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TodoCard;
