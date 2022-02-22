pragma solidity 0.5.3;
pragma experimental ABIEncoderV2;
contract TodoDapp{
    struct Todo{
        uint id;
        string title;
        string description;
        string priority;
        string created_at;
        string updated_at;
        string status;
    }

     Todo[] public todos;
    uint public newTodoId;

    function createTodo(string memory _title,
    string memory _description,
    string memory _priority,
    string memory _created_at,
    string memory _updated_at,
    string memory _status)
    public
    {
        todos.push(Todo(newTodoId,_title,_description,
            _priority,
            _created_at,
            _updated_at,
            _status));
        newTodoId++;
    }

    function findTodo(uint _id) internal view returns (uint){
        for(uint todoCounter = 0; todoCounter <= todos.length;){
            if(todos[todoCounter].id == _id){
                return todoCounter;
            }
            todoCounter++;
            revert("Todo not found!");
        }
    }

    function updateTodo(uint _id, string memory _title, string memory _description,
            string memory _priority,
            string memory _created_at,
            string memory _updated_at,
            string memory _status) public{
            uint todoId = findTodo(_id);
            todos[todoId].title = _title;
            todos[todoId].description = _description;
            todos[todoId].priority = _priority;
            todos[todoId].created_at = _created_at;
            todos[todoId].updated_at = _updated_at;
            todos[todoId].status = _status;
            }
    function showTodo(uint _id) public view returns(uint, 
    string memory,
    string memory,
    string memory,
    string memory,
    string memory,
    string memory)
    {
        uint todoId = findTodo(_id);
        return(
            todos[todoId].id,
            todos[todoId].title,
            todos[todoId].description,
            todos[todoId].priority,
            todos[todoId].created_at,
            todos[todoId].updated_at,
            todos[todoId].status
        );
    }

    function destroyTodo(uint _id) public {
        uint todoId = _id;
        delete todos[todoId];
        newTodoId--;
    }
}
