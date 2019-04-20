
const burgerTemplate= (burgerName,id,is_favorite)=>
 {
     const burgerContainer= $('<div>').attr({
         class: 'content-burger__list',
         id: id
     });
     const img= $('<img>').attr({
         src: './images/',
         alt: '',

     });
     const name= $('<p>');
     const button= $('<button>').attr({
         'data-id': id,
         class: 'btn btn-btn-default favorites',
         'data-state': is_favorite
     });
     name.html(burgerName)
     button.html('add to Favorite');
     burgerContainer.append(img, name, button);

     return burgerContainer;

 };
//added
 const displayNewBurger= (burger) => {
    const name= burger.burger_name;
    const id= burger.id;
    const is_favorite= burger.is_favorite;

    const newBurger= burgerTemplate(name,id,is_favorite );

    $('.content-burger').prepend(newBurger);
    $('input').val('');
 };

//fail

 const addBurgerFail= (response) => {
     alert('failed to add burger');
 };

$('button[type="submit"]').on('click', function(event){
    event.preventDefault();

    const burgerName= $('input[name="burger_name"]').val();

    $.ajax({
        url: '/add',
        method: 'post',
        data: {
            burger_name: burgerName
        }
    })
    .then(displayNewBurger)
    .catch(addBurgerFail);
});

//delete
const removeBurgerOnDelete = (burger) => {
    const id = burger.id;

    $(`.all-burgers .burger[data-id=${id}]`).remove();
};


const removeBurgerFailed = () => {
    alert('Fail deleting burger');
};

$('.all-burgers .burger button').on('click', function() {
    const id = $(this).attr('data-id');


    $.ajax({
        url: `/delete/${id}`,
        method: 'DELETE'
    })
    .then(removeBurgerOnDelete)
    .catch(removeBurgerFailed);
});

//add to favorites

const addBurgerToFavorite = (burger) => {
    const id= burger.id;

    $(`#${id}`).remove();
}

const addBurgerToFavoriteFail= () => {
    alert('failed to add burger to favorite')
}

$(document).on('click', '.favorites', function() {
    const id= $(this).attr('data-id');
    const value= $(this).attr('data-state');
    let condition = value === '0' ? false : true;
    $.ajax({
        url: `/${id}/${!condition}`,
        method: 'PUT'
    })
    .then(addBurgerToFavorite)
    .catch(addBurgerToFavoriteFail);
});
