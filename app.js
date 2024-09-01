
let url=`https://www.themealdb.com/api/json/v1/1/search.php?s=`;

let recipe=document.querySelector(".recipe-details");
let con=document.querySelector(".recipe-content");
let close=document.querySelector(".recipe-close-btn");
let cancel=document.querySelector("#cancel");


let input=document.querySelector("input");
let btn=document.querySelector("#just");

 document.querySelector(".main_container").innerHTML="Search Your favourite Recipe "
btn.addEventListener("click",()=>{
    let choice=input.value;
    if(choice==""){
        document.querySelector(".main_container").innerHTML="Please search your Recipe"
    }else{
         document.querySelector(".main_container").innerHTML="Searching your recipe...."
        find(choice);
        input.value="";
    }
 
    // input.value="";
    // console.log(choice);
    // find(choice);
})

async function find(choice){
    try{
        let load=await axios.get(url+choice);
    
        let find=load.data;
        console.log(find.meals);
       
        searching(find);
        // for(meal of find.meals){
        //     console.log(meal);
        //     let temp=document.querySelector(".printed");
            
        // }
        // console.log(load.data.meals);
        // load.data.meals()
        // console.log(load.data.meals[0].strMeal);
        // console.log(load.data.meals[0].strTags);
        // console.log(load.data.meals[0].strCategory);
        // console.log(load.data.meals[0].strMealThumb);
        // console.log(load.data.meals[0].strSource);
        // console.log(load.data.meals[0].strYoutube);
    }catch(err){
        console.log(err);
    }
}

async function searching(find){
    let temp=document.querySelector(".printed");
    let main=document.querySelector(".main_container");
    main.innerHTML="";


    for(meal of find.meals){
        console.log(meal);
       
        let cardclone=temp.content.cloneNode(true);
        final(cardclone,meal);
        main.append(cardclone);


        // let button=document.createElement("button");
        // button.classList.add(".last");
        // button.textContent="View Recipe";
        // temp.append(button);
    }

}

function final(cardclone,meal){
   let img=cardclone.querySelector("img");
   let mea=cardclone.querySelector("#meal");
   let tags=cardclone.querySelector("#tags");
   let category=cardclone.querySelector("#category");
   let a=cardclone.querySelector("a");
   let btn=cardclone.querySelector(".view");
   img.src=meal.strMealThumb;
   mea.textContent=meal.strMeal;
   tags.textContent=meal.strTags;
   category.textContent=meal.strCategory;
  
   btn.addEventListener("click",()=>{
    console.log("btn was clickable");

    vie(meal)

})

let vie=(meal)=>{
    con.innerHTML=`
    <h2 class="recipename">${meal.strMeal}</h2>
    
      <h3>Ingredents :</h3>
    <ul class="lists">
        ${fetchIngredients(meal)}
    </ul>
   
     <div class="instruct">
        <h3>Instructions:</h3>
        <p class="finins">${meal.strInstructions}</p>
    </div>

    <div class="bottom">

   <span>
    <a href="${meal.strSource}" class="more">Read More</a>
   </span> 
  
   <span>
    <a href="${meal.strYoutube}" class="tube">You Tube</a>
   </span>
   </div>
  
    
    `
    con.parentElement.style.display="block";

    cancel.addEventListener("click",()=>{
        con.parentElement.style.display="none";
    })
}


const fetchIngredients=(meal)=>{
    let ingredientlist="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientlist+=` <li>${measure} ${ingredient}</li>`

        }else{
            break;
        }
    }
    console.log(ingredientlist);
    return ingredientlist;
}

   
   
}


