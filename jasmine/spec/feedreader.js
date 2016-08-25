/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all have a URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            });
        })

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all have a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            });
        })
    });


    /* A test suite for the RSS feed menu */
    describe("The menu", function() {
        /* A test that ensures the menu element is
         * hidden by default. */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and it hides when clicked again.
          */
        it('changes visibility when menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* A test suite for the initial invocation of the loadFeed function */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed function is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);// Load the first feed (index of 0), passing in done as the callback
        });

        it('are defined after calling loadFeed function', function(done) {
            //check that the array containing the feed entries has a length that is not 0
            //expect($('.entry').length).not.toBe(0);
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });

    });

    /* A test suite for selecting a new feed with the loadFeed function*/
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * The loadFeed function is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        var oldEntry = {};//holds the first entry from the first call to loadFeed

        beforeEach(function(done) {
            loadFeed(0, function(){// Load the first feed (index of 0).
                oldEntry = $('.entry')[0];//the first entry from the feed
                loadFeed(2, done);// Load the third feed (index of 2), passing in done as the callback
            });
        });

        afterAll(function(done) {
            //After all specs finish, load the first feed to restore the page to its starting state
            loadFeed(0, done);
        });

        it('changes the content of the RSS feed entries', function(done) {
            //check that the first entry from each of the two calls to loadFeed are not the same
            expect($('.entry')[0].isEqualNode(oldEntry)).toBe(false);
            done();
        });
    });

}());
