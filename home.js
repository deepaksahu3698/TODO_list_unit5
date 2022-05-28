async function addtolist(){

    try {

        let task_name=document.getElementById("taask_name").value
        if(task_name==""){
            alert("fill up the task input")
            
        }
        else{
            let flag=false
    if(document.getElementById("complet").checked==true){
        flag=true
    }
    // console.log(task_name)
    // console.log(flag)
   let body={
       "task":task_name,
       "status":flag
   };
   let res=await fetch(`http://localhost:3000/tasks`,{
    method:"POST",
    body:JSON.stringify(body),
    headers:{
        "Content-Type":"application/json"
    }
   })
        }
    

    } catch (error) {
        console.log(error)
    }
    

}let disPly_cont=document.getElementById("display_cont")
async function displaytask(){
    
    disPly_cont.innerHTML=""

    let res=await fetch(`http://localhost:3000/tasks`)
    let data= await res.json()
    // console.log(data)
    data.forEach(e => {
        let task_cont=document.createElement("div")
        task_cont.className="task_cont"
        let taask_name=document.createElement("b")
        taask_name.textContent=e.task
        let task_status=e.status
        console.log(task_status)
        if(task_status==false){
            taask_name.className="red"
        }
        else{
            taask_name.className="green"
        }
        let delete_button=document.createElement("button")
        delete_button.textContent="DELETE"
        delete_button.onclick=async function(){
            let res=await fetch(`http://localhost:3000/tasks/${e.id}`,{
                method:"DELETE"
            });
            displaytask()
        }
        let edit_button=document.createElement("button")
        edit_button.textContent="EDIT"
        edit_button.onclick=function(){

        }
        task_cont.append(taask_name ,delete_button)
        disPly_cont.append(task_cont)

    });
}
displaytask()