let addBtn=document.querySelector(".add-btn");
let modalContainer=document.querySelector(".modal-container");
let mainContainer=document.querySelector('.main-container');
let colors=['lightpink','lightblue','lightgreen','black'];
let defaultColor=colors[colors.length-1];
let allPriorityColors=document.querySelectorAll('.priority-color');
let addFlag=false;
let textArea=document.querySelector('.textarea-container');
let removeBtn=document.querySelector('.remove-btn');
let toolBoxColors=document.querySelectorAll('.color')
let removeFlag=false;
let lockClass='fa-lock';
let unlockClass='fa-lock-open';
let ticketsArray=[];


addBtn.addEventListener('click',function(){
    //addFlag true display modal
    addFlag=!addFlag;
    if(addFlag){
        modalContainer.style.display='flex';
    }
    else
    {
        modalContainer.style.display="none";
    }
});
//filter tickets according to color
for(let i=0;i<toolBoxColors.length;i++)
{
    toolBoxColors[i].addEventListener('click',function(){
        let currentToolBoxColor=toolBoxColors[i].classList[0];
        let filterTickets=ticketsArray.filter(function(ticketObj){
            return currentTicketColor===ticketObj.ticketColor;
        })
        let allTickets=document.querySelectorAll('.ticketCont')
        for(let i=0;i<allTickets.length;i++)
        {
            allTickets[i].remove();
        }
        filterTickets.forEach(function(fiterObj)
        {
            creatTicket(fiterObj.ticketColor,fiterObj.text,fiterObj.ticketId);
        }
        )

    })
}


// generating ticket
modalContainer.addEventListener('keypress',function(e){
let key=e.key;
if(key=='Enter'){
    creatTicket(defaultColor,textArea.value);//taking color and text value which is a property of textarea.
    modalContainer.style.display="none";
    addFlag=false;
    textArea.value=''//new ticket will be empty.
}

});
//changingprioritycolor
allPriorityColors.forEach(function(colorElem){
    colorElem.addEventListener('click',function (e) {
            allPriorityColors.forEach(function (priorityColorElem) {
                priorityColorElem.classList.remove('active');
            });
            colorElem.classList.add('active');
             defaultColor=colorElem.classList[0]; //modalPriorityColor
        })
})
//finction to creat ticket
function creatTicket(ticketColor,text,ticketId)
{
let ticketCont=document.createElement('div');
ticketCont.setAttribute('class','ticket-container');//class="ticket-container"
ticketCont.innerHTML=`<div class="ticket-color ${ticketColor}"></div>
<div class="ticket-id">${ticketId}</div>
<div class="ticket-task">${text}</div>
<div class="ticket-lock">
<i class="fa-solid fa-lock"></i></div>
</div> `;
mainContainer.appendChild(ticketCont);//adding three divs to main container
handleRemoval(ticketCont);
handleLock(ticketCont);
ticketsArray.push({ticketColor,text,ticketId});

}
//function to remove ticket
removeBtn.addEventListener('click',function () {
    removeFlag=!removeFlag;
    if(removeFlag==true)
    {
        removeBtn.style.color= '#fad2e1'
    }
    else
    {
        removeBtn.style.color= '#1c1d21'
    }
})

function handleRemoval(ticket){

    ticket.addEventListener('click',function(){
        if(removeFlag==true)
        {
           ticket.remove();
        }
    })

}
//LOCK and Unlock Tickets
function handleLock(ticket){
    let ticketLockElement=ticket.querySelector('.ticket-lock');
    let ticketLock=ticketLockElement.children[0];
    let taskArea=document.querySelector('.ticket-task');
    ticketLock.addEventListener('click',function(e){
    if(ticketLock.classList.contains(lockClass))
    {
        ticketLock.classList.remove(lockClass);
        ticketLock.classList.add(unlockClass);
        taskArea.setAttribute('contenteditable','true');
        handleColor(ticket);
        
    }
    else if(ticketLock.classList.contains(unlockClass))
    {
        ticketLock.classList.remove(unlockClass);
        ticketLock.classList.add(lockClass);
        taskArea.setAttribute('contenteditable','false');
    }
    });
}

function handleColor(ticket){
let ticketColorBand=document.querySelector('.ticket-color');
ticketColorBand.addEventListener('click',function(e){
    let currentTicketColor=ticketColorBand.classList[1];
    let currentTicketIdx=colors.findIndex(function(color){
        return currentTicketColor===color;

    })
    currentTicketIdx++;
    let newColorTicketIdx=currentTicketIdx%colors.length;
    let newColorTicket=colors[newColorTicketIdx];
    ticketColorBand.classList.remove(currentTicketColor);
    ticketColorBand.classList.add(newColorTicket);

});
}