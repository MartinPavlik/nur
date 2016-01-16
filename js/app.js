var data = [
   {
      name: "Svíčková",
      cook: "Jana Novotná",
      distance: 1.5,
      time: "13:00",
      price: 65,
      city: 'Borovany',
      street: 'Třeboňská 345',
      code: '373 12',
      rating: 9.5,
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1GRLpUyfW7-vo8VDS16Zp_GTv7TrOTlKGcpsKW9m-F5avDKXm',
      ingredients: [
         "800 g hovězího zadního (kýta)",
         "100 g špeku",
         "2 - 3 mrkve",
         "1/2 středně velkého celeru",
         "1 - 2 petržele",
         "2 cibule",
         "500 ml hovězího vývaru (než použít kostku, vezměte raději jen vodu)",
         "2 lžíce sádla",
         "2 lžíce másla",
         "2 - 3 lžíce octa",
         "3 lžíce cukru",
         "1 lžíce hořčice",
         "cca 5 kuliček černého pepře",
         "cca 5 kuliček nového koření",
         "bobkový list",
         "1/2 citronu",
         "25 g másla",
         "25 g hladké mouky",
         "200 ml smetany na vaření nebo ke šlehání",
         "sůl, pepř"
      ]
   }, 
   {
      name: "Guláš",
      cook: "Tomáš Starý",
      distance: 3,
      time: "12:00",
      price: 45,
      city: 'Borovany',
      street: 'Na Výsuní 5',
      imgUrl: 'http://www.cvcoa.org/assets/images/old%20man.jpg',
      code: '373 12',
      rating: 9,
      ingredients: [
         "0,5 kg hovězí kližky",
         "2 až 3 lžíce sádla",
         "objemově tolik cibule, jaký má objem pokrájené hovězí maso na kostky",
         "sladká mletá červená paprika (podle chuti může být i pálivá)",
         "sůl",
         "pepř",
         "střítka čerstvého chleba (cca. čtvrt krajíce)",
         "voda na podlití"
      ]
   },
   {
      name: "Špagety pomodoro",
      cook: "Ivan Hnilička",
      distance: 5,
      time: "12:30",
      price: 55,
      city: 'Borovany',
      street: 'U Zámku 9',
      imgUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQWOTYltSeEhzquIyNwNbHAhOY5SaMgUaoPECFhQpdy_ieSg_RP1g',
      code: '373 12',
      rating: 10,
      ingredients: [
         "5 velkých čerstvých rajčat",
         "3 stroužky česneku",
         "2dc bílého suchého vína",
         "500g těstovin spaghetti ",
         "sůl, pepř ",
         "pár lístků bazalky ",
         "tvrdý strouhaný sýr Gran Moravia",
         "panenský olivový olej"
      ]
   }
];

var ORDER_BUTTONS = {
   deliveryService: 'deliveryService',
   personalPickup: 'personalPickup'
};

var appState = {
   meals: data,
   current: 0,
   orderModalOpen: false,
   orderedMeal: null,
   selectedDelivery: ORDER_BUTTONS['personalPickup'],
   buttons: ORDER_BUTTONS,
};



var mealPicker = new Vue({
  el: '#app',
  data: appState
})


var orderModal = new Vue({
   el: '#order',
   data: appState
});

var sumUp = new Vue({
   el: '#sumUp',
   data: appState
});

var $orderModal = $('#order');
$orderModal.on('hide.bs.modal', function(){
   appState.orderModalOpen = false;
})

function makeOrder() {
   appState.orderedMeal = appState.meals[appState.current];
   $orderModal.modal('hide');
   console.info("order", appState.meals[appState.current], appState.current);
   console.info(appState)
}

function onEnter() {
   if(appState.orderModalOpen) {
      makeOrder();
   } else {
      appState.orderModalOpen = true;
      $orderModal.modal('show');
   }
}

function onRight() {
   if(appState.orderModalOpen) {
      appState.selectedDelivery = ORDER_BUTTONS['deliveryService'];
   } else if(appState.orderedMeal == null) {
      if(appState.current == appState.meals.length-1) return
      appState.current = appState.current + 1;
   }
}

function onLeft() {
   if(appState.orderModalOpen) {
      console.log('left');
      appState.selectedDelivery = ORDER_BUTTONS['personalPickup'];
   } else if(appState.orderedMeal == null) {
      if(appState.current == 0) return
      appState.current = appState.current - 1;
   }
}

// Key down handler
function handleKeyDown(event) {
    var keyCode = event.keyCode;
    if(keyCode == 32 || keyCode == 39) {
      onRight();
    } else if(keyCode == 37) {
      onLeft();
    } else if(keyCode == 13) {
      onEnter();
    } else if(keyCode == 27) {
    }

}

document.addEventListener("keydown", handleKeyDown, false);