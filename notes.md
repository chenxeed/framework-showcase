1. Explain the data flow of todo

2. Explain the plan to make todo undoable

    - The data state (**todosState**) was hold in todosData and it's modified whenever we do **action** (add/delete).
    - First thought is to pass the *todosState* into historyUtils and use historyUtils as the published data state.
    - The data flow is like this:

    action ----> todosState$ ----> add$ ----> updateHistory ----> historyState$ --> view
    undo$  ------------------------------/ 
    redo$  -----------------------------/ 

3. Explain the initial problem on making todo undoable:
  
    - It's working to record the data history **(historyState)** on each **action**, and undo/redo also still works. However the problem arise when we do action not in the latest history. When we undo, the data will revert to previous one from **historyState**. But when we add another data, the **todosState** is still the latest value from itself, not same with the current data from **historyState**. The example process are:
    1. add "pen"
    ```
    todosState$ : ["pen"]
    historyState$ : {
      history : [ ["pen"] ],
      index: 0
    }
    => return ["pen"]
    ```
    2. add "apple"
    ```
    => todosState$ : ["pen", "apple"]
    => historyState$ : {
      history : [ ["pen"], ["pen", "apple"] ],
      index: 1
    }
    => return ["pen", "apple"]
    ```
    3. undo
    ```
    => todosState$ : ["pen", "apple"]
    => historyState$ : {
      history : [ ["pen"], ["pen", "apple"] ],
      index: 0
    }
    => return ["pen"]
    ```
    4. add "applepen" (problem occurs here)
    ```
    => todosState$ : ["pen", "apple", "applepen"]
    => historyState$ : {
      history : [ ["pen"], ["pen", "apple", "applepen"] ],
      index: 0
    }
    => return ["pen", "apple", "applepen"]
    ```

    So one thought of solution is to update the todosState whenever we undo/redo, right? But that flow is not working with the concept of data flow.

    action ----> todosState$ ----> add$ ----> updateHistory ----> historyState$ --> view
    undo$  --/ 
    redo$  -/ 

4. Explain the solution to handle the flow

    The current situation to handle this is to not store the **todosState** and **historyState** differently, but to put the **todosState** as in the **historyState.history** directly. So in this case, we let the **historyState** to hold the todos reducer that will modify the **historyState:history**.

    action -----> add$ ----> updateHistory ----> historyState$ --> view
    undo$  --------------/ 
    redo$  -------------/

    1. add "pen"
    ```
    historyState$ : {
      history : [ ["pen"] ],
      index: 0
    }
    => return ["pen"]
    ```
    2. add "apple"
    ```
    => historyState$ : {
      history : [ ["pen"], ["pen", "apple"] ],
      index: 1
    }
    => return ["pen", "apple"]
    ```
    3. undo
    ```
    => historyState$ : {
      history : [ ["pen"], ["pen", "apple"] ],
      index: 0
    }
    => return ["pen"]
    ```
    4. add "applepen" (problem occurs here)
    ```
    => historyState$ : {
      history : [ ["pen"], ["pen", "applepen"] ],
      index: 0
    }
    => return ["pen", "applepen"]
    ```

