// const firestore=require("../scripts/firebase-authentication/firebase");
// var data=[];
// let add_success=false;
// let modify_success=false;
// let remove_success=false;
// const chart=require('chart.js');
// const chartist=require('chartist');
// // module.exports.get_realtime_data=function(){
// //     let database=firestore.firebaseInit(10);
// //    // alert(database)
// //     database.collection("register_user")
// //     .onSnapshot(function(snapshot) {
// //        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
// //         let changes=snapshot.docChanges();
// //         console.log(changes);
// //         changes.forEach(element => {
// //             if(element.type=='added'){
// //                // console.log(changes.doc.id)
// //                 data.push(element.doc.id);
// //                 success=true;
// //             }

// //             else if(element.type=='modified'){
// //                 console.log(element.doc.id);
// //                 data.push(element.doc.id);
// //                 success=true; 
// //             }
// //         });
        
// //         if(success){
// //             console.log("SE "+data)
// //             return data;
// //         } 
// //         console.log(" data: ", changes[0].doc.id);
// //     });
// // }

// export function get_realtime_data(){
//     let database=firestore.firebaseInit(10);
//    // alert(database)
//     database.collection("register_user")
//     .onSnapshot(function(snapshot) {
//        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
//         let changes=snapshot.docChanges();
//         console.log(changes);
//         changes.forEach(element => {
//             if(element.type=='added'){
//                 console.log(element.doc.data().role)
//                 data.push(element.doc.data());
//                 add_success=true;
//             }

//             else if(element.type=='modified'){
//                 console.log(element.doc.data().role)
//                 data.push(element.doc.data());
//                 modify_success=true; 
//             }

//             else if(element.type=='removed'){
//                 data.push(element.doc);
//                 remove_success=true; 
//             }
//         });

        
//         if(add_success){
//             console.log("SE "+data)
//             var artist_count=data.filter(filter_data_artist).length;
//             var organizer_count=data.filter(filter_data_organizer).length;
//             var venue_count=data.filter(filter_data_venue).length;
//             var supplier_count=data.filter(filter_data_supplier).length;
//             console.log(artist_count+organizer_count+venue_count+supplier_count);
//             document.getElementById('organizer_count').innerHTML=organizer_count;
//             document.getElementById('artist_count').innerHTML=artist_count;
//             document.getElementById('venue_count').innerHTML=venue_count;
//             document.getElementById('supplier_count').innerHTML=supplier_count;
//             createUserChart(artist_count,organizer_count,supplier_count,venue_count);
//             createUserDeletionChart(0,0,0,0);
//             //return data;
//         } 
//         if(modify_success){
//             console.log("SE "+data);
//             var artist_count=data.filter(filter_data_artist).length;
//             var organizer_count=data.filter(filter_data_organizer).length;
//             var venue_count=data.filter(filter_data_venue).length;
//             var supplier_count=data.filter(filter_data_supplier).length;
//             console.log(artist_count+organizer_count+venue_count+supplier_count);

//             var artist_deleted_count=data.filter(filter_artist_delete).length;
//             var organizer_deleted_count=data.filter(filter_organizer_delete).length;
//             var venue_deleted_count=data.filter(filter_venue_delete).length;
//             var supplier_deleted_count=data.filter(filter_supplier_delete).length;

//             document.getElementById('organizer_count').innerHTML=organizer_count;
//             document.getElementById('artist_count').innerHTML=artist_count;
//             document.getElementById('venue_count').innerHTML=venue_count;
//             document.getElementById('supplier_count').innerHTML=supplier_count;
//             createUserDeletionChart(artist_deleted_count,organizer_deleted_count,supplier_deleted_count,venue_deleted_count);
//            // return data;
//         } 
//         if(remove_success){
//             console.log("SE "+data);
//             var artist_count=data.filter(filter_data_artist).length;
//             var organizer_count=data.filter(filter_data_organizer).length;
//             var venue_count=data.filter(filter_data_venue).length;
//             var supplier_count=data.filter(filter_data_supplier).length;
//             createUserDeletionChart(artist_count,organizer_count,venue_count,supplier_count);
//            // createUserDeletionChart(artist_count,organizer_count,venue_count,supplier_count);
//             return data;
//         } 
//         console.log(" data: ", changes[0].doc.id);
//     });
// }


// export function get_realtime_notification(){
//     let database=firestore.firebaseInit(10);
//    // alert(database)
//     var notification=new AdminNotificationsComponent();
//     console.log(notification.data)
//     database.collection("register_user")
//     .onSnapshot(function(snapshot) {
//        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
//         let changes=snapshot.docChanges();
//         console.log(changes);
//         changes.forEach(element => {
//             if(element.type=='added'){
//                 console.log(element.doc.data().role)
//                 data.push(element.doc.data());
//                 add_success=true;
//             }

//             else if(element.type=='modified'){
//                 console.log(element.doc.data().role)
//                 data.push(element.doc.data());
//                 modify_success=true; 
//             }

//             else if(element.type=='removed'){
//                 data.push(element.doc);
//                 remove_success=true; 
//             }
//         });

        
//         if(add_success){
//             console.log("SE "+data)
//             var artist_count=data.filter(filter_data_artist).length;
//             var organizer_count=data.filter(filter_data_organizer).length;
//             var venue_count=data.filter(filter_data_venue).length;
//             var supplier_count=data.filter(filter_data_supplier).length;
//             console.log(artist_count+organizer_count+venue_count+supplier_count);
//             document.getElementById('organizer_count').innerHTML=organizer_count;
//             document.getElementById('artist_count').innerHTML=artist_count;
//             document.getElementById('venue_count').innerHTML=venue_count;
//             document.getElementById('supplier_count').innerHTML=supplier_count;
//             createUserChart(artist_count,organizer_count,supplier_count,venue_count);
//             createUserDeletionChart(0,0,0,0);
//             //return data;
//         } 
//         if(modify_success){
//             console.log("SE "+data);
//             var artist_count=data.filter(filter_data_artist).length;
//             var organizer_count=data.filter(filter_data_organizer).length;
//             var venue_count=data.filter(filter_data_venue).length;
//             var supplier_count=data.filter(filter_data_supplier).length;
//             console.log(artist_count+organizer_count+venue_count+supplier_count);

//             var artist_deleted_count=data.filter(filter_artist_delete).length;
//             var organizer_deleted_count=data.filter(filter_organizer_delete).length;
//             var venue_deleted_count=data.filter(filter_venue_delete).length;
//             var supplier_deleted_count=data.filter(filter_supplier_delete).length;

//             document.getElementById('organizer_count').innerHTML=organizer_count;
//             document.getElementById('artist_count').innerHTML=artist_count;
//             document.getElementById('venue_count').innerHTML=venue_count;
//             document.getElementById('supplier_count').innerHTML=supplier_count;
//             createUserDeletionChart(artist_deleted_count,organizer_deleted_count,supplier_deleted_count,venue_deleted_count);
//            // return data;
//         } 
//         if(remove_success){
//             console.log("SE "+data);
//             var artist_count=data.filter(filter_data_artist).length;
//             var organizer_count=data.filter(filter_data_organizer).length;
//             var venue_count=data.filter(filter_data_venue).length;
//             var supplier_count=data.filter(filter_data_supplier).length;
//             createUserDeletionChart(artist_count,organizer_count,venue_count,supplier_count);
//            // createUserDeletionChart(artist_count,organizer_count,venue_count,supplier_count);
//             return data;
//         } 
//         console.log(" data: ", changes[0].doc.id);
//     });
// }

// function filter_data_artist(data){
//     //console.log(data.role)
//     return data.role=='artist' && data.profile_status=='Active';
// }

// function filter_data_supplier(data){
//     //console.log(data.role)
//     return data.role=='supplier' && data.profile_status=='Active';
// }

// function filter_data_venue(data){
//     //console.log(data.role)
//     return data.role=='venue_owner' && data.profile_status=='Active';
// }

// function filter_data_organizer(data){
//    // console.log(data.role)
//     return data.role=='organizer' && data.profile_status=='Active';
// }

// function filter_artist_delete(){
//     return data.role=='artist' && data.profile_status=='Deleted';
// }

// function filter_organizer_delete(){
//     return data.role=='organizer' && data.profile_status=='Deleted';
// }

// function filter_supplier_delete(){
//     return data.role=='supplier' && data.profile_status=='Deleted';
// }

// function filter_venue_delete(){
//     return data.role=='venue_owner' && data.profile_status=='Deleted';
// }


// function createUserChart(artist_count,organizer_count,supplier_count,venue_owner_count){
//     new Chart('barchart',{
//         type: 'bar',
//         data: {
//             labels: ['Organizer', 'Artist', 'Supplier', 'Venue-Owner'],
//             datasets: [{
//                 label: 'No of Users',
//                 data: [organizer_count,artist_count,supplier_count,venue_owner_count],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(11, 156, 49,1)',
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                 ],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });
//   }

//   function createUserDeletionChart(artist,organizer,supplier,venue_owner){
//     new Chart('barchart1',{
//         type: 'bar',
//         data: {
//             labels: ['Organizer', 'Supplier', 'Venue-Owner', 'Artist'],
//             datasets: [{
//                 label: 'No of User Deletions',
//                 data: [organizer,supplier,venue_owner,artist],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });
//   }