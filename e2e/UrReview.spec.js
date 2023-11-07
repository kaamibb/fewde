/* eslint-disable max-len */
const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
    I.amOnPage('/');
    I.wait(3);
  
    I.seeElement('.resto-title');
    I.click(locate('.resto-title').at(3));
});

Scenario('Reviewing a Restaurant', async ({ I }) => {
    const inputName = 'Bima Arya K';
    const inputReview = 'This restaurant is great!';
  
    I.seeElement('#customerReviewFormContainer');
    I.seeElement('#form-review');
    
    I.fillField('#inputName', inputName);
    I.fillField('#inputReview', inputReview);
    I.wait(3);
    await I.say('Resto Input Customer Review - Screenshot');
    I.saveScreenshot('resto_inputcustreview.png');
  
    I.click('button[type="submit"]');
    I.wait(3);

    const lastReviewNameIndex = await I.grabNumberOfVisibleElements('.client-details h6') - 1;
    const lastReviewName = await I.grabTextFrom(locate('.client-details h6').at(lastReviewNameIndex));
    assert.strictEqual(lastReviewName, inputName, 'Submitted name does not match the last displayed name');
    
    const lastReviewContentIndex = await I.grabNumberOfVisibleElements('.testimonial-content p') - 1;
    const lastReviewContent = await I.grabTextFrom(locate('.testimonial-content p').at(lastReviewContentIndex));
    assert.strictEqual(lastReviewContent, inputReview, 'Submitted review does not match the last displayed review');
    
    await I.say('Succes Add Customer Review - Screenshot');
    await I.saveScreenshot('last_review.png');
});


// Before Block:

// Membuka halaman utama
// Menunggu selama 3 detik
// Memastikan adanya elemen dengan kelas .resto-title
// Mengklik elemen resto dengan indeks ke-3
// Scenario Block:

// Mengisi formulir ulasan pelanggan dengan nama "Bima Arya K" dan ulasan "This restaurant is great!"
// Memastikan bahwa elemen #customerReviewFormContainer dan #form-review ada di halaman
// Mengisi kolom input dengan nama dan ulasan yang ditentukan
// Menunggu selama 3 detik sebelum menyimpan tangkapan layar dengan pesan 'Resto Input Customer Review - Screenshot'
// Mengklik tombol submit pada formulir ulasan
// Menunggu selama 3 detik
// Memeriksa apakah ulasan yang dikirimkan ditampilkan dengan benar
// Membandingkan nama terakhir yang ditampilkan dengan input nama yang dikirimkan dan ulasan terakhir yang ditampilkan dengan input ulasan yang dikirimkan
// Menyimpan tangkapan layar terakhir dengan pesan 'Success Add Customer Review - Screenshot'