'use strict'
/**
 * TodoListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListController {
    /**
     * The constructor sets up all event handlers for all user interface
     * controls known at load time, meaning the controls that are declared 
     * inside index.html.
     */
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_LIST]);

        // THEN THE CONTROLS ON THE LIST SCREEN
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoHTML.CLICK, this[TodoCallback.PROCESS_GO_HOME]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_NAME]);
        this.registerEventHandler(TodoGUIId.LIST_OWNER_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_OWNER]);
        this.registerEventHandler(TodoGUIId.LIST_TRASH, TodoHTML.CLICK, this[TodoCallback.PROCESS_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.LIST_DELETE_CONFIRMATION_NO, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.LIST_DELETE_CONFIRMATION_YES, TodoHTML.CLICK, this[TodoCallback.PROCESS_CONFIRM_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.ITEM_FORM_CANCEL_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_NEW_ITEM]);
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {TodoGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {TodoHTML} eventName The type of control for which to respond.
     * @param {TodoCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);
        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        control.addEventListener(eventName, callback);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeOwner() {
        let ownerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        let newOwner = ownerTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListOwner(listBeingEdited, newOwner);
    }

    /**
     *  This function responds to when the user click the trash can 
     *  and want to delete the list.
     */
    processDeleteList() {
        // Pop a window for user to check to confirm
        window.todo.model.deleteConfirm();
    }

    /**
     *  This function responds to when the user confirmed and then delete the list.
     */
    processConfirmDeleteList() {
        window.todo.model.deleteList();

    }

    /**
     *  This function responds to when the user want to cancel and not delete
     *  the list.
     */
    processCancelDeleteList() {
        window.todo.model.cancalListDeletion();
    }

    
    /**
     *  This function pop a new dialog and let the user add a item to the list
     */
    processAddNewItem() {
        this.registerEventHandler(TodoGUIId.ITEM_FORM_SUMBIT_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_SUBMIT_NEW_ITEM]);
        window.todo.model.addNewItem();
    }


    /**
     *  This function responds to when the user want to add a new item
     * 
     */
    processSubmitNewItem() {
        window.todo.model.submitNewItem();
    }

    /**
     *  This function responds to when the user want to cancel adding a new item
     * 
     */
    processCancelNewItem() {
        window.todo.model.cancelNewItem();
    }


    /**
     *  This function responds to when the user want to edit an item
     * 
     * @param {int} index the index of the item
     */
    processEditItem(index)
    {
        //this.registerEventHandler(TodoGUIId.ITEM_FORM_SUMBIT_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_SUBMIT_ITEM_CHANGES]);
        $(document).on(TodoHTML.CLICK, "#"+TodoGUIId.ITEM_FORM_SUMBIT_BUTTON, function(){
            window.todo.controller.processSubmitItemChanges(index);
        });
        window.todo.model.editItem(index);
    }

    /**
     *  This function responds to when the user want to submit changes for items
     * 
     *  @param {string} index the index of the item
     */
    processSubmitItemChanges(index) {
        window.todo.model.submitItemChanges(index);

    }

    // /**
    //  *  This function responds to when the user want to cancel changes for items
    //  * 
    //  */
    // processCancelItemChanges() {
    //     window.todo.model.cancelNewItem();
    // }



    /**
     * This function is called when the user requests to create
     * a new list.
     */
    processCreateNewList() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on a link
     * for a list on the home screen.
     * 
     * @param {String} listName The name of the list to load into
     * the controls on the list screen.
     */
    processEditList(listName) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome() {
        window.todo.model.goHome();
    }

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Due Date header in the items table.
     */
    processSortItemsByDueDate() {
        // IF WE ARE CURRENTLY INCREASING BY DUE DATE SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    /**
     * This function move the seleted item one slot up
     */
    processMoveItemUp(index){
        event.stopPropagation();
        window.todo.model.moveItemUp(index);

    }

    /**
     * This function move the seleted item on slot down
     */
    processMoveItemDown(index){
        event.stopPropagation();
        window.todo.model.moveItemDown(index);


    }

    /**
     * This function remove the seleted item from the list
     */
    processDeleteItem(index){
        event.stopPropagation();
        window.todo.model.deleteItem(index);
        

    }
}