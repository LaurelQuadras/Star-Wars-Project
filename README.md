## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

![Architecture Diagram of the Components in this project](<Architecture Flowchart of Starwars project.png>)

I have used React (Nextjs) for this application. I used it for it's Server side rendering which I have implemented in this project. Also, since there are several similar UI components between the three pages ( /planets, /planets/:id, /favorites ) I have created common Components which I have re-used for these three routes. The following is a brief summary of the responsibilities of each component.

- **Route component for /planets**: This component which is rendered Server side performs a server api call to get the list of PlanetsData to be displayed in UI. It passes this data to it's children.
- **Route component for /planets/:id**: This component which is rendered Server side performs two server api calls:- To get the list of PlanetsData to be displayed in UI and to get the PlanetDetailData for the id passed in the parameter. It passes these both data to it's children.
- **Route component for /favorites**: This component is rendered client side to fetch the FavoritesList from Redux and to make the api call to fetch the PlanetDetailData for the planets present in FavoritesList. It passes this data to it's children.
- **PlanetsComponent**: This is a common component for all the three routes. This component receives the appropriate API response data from it's parent. This is a client component which takes care of rendering the common component in all three pages like SideNavigationComponent. In this component, I also render Remove PopUpModalComponent since it has to be shown in the center of the browser window. It is also responsible for managing the removal of a Planet from FavoritesList in Favorites route. This component is where I can do any manipulations for the data coming in from the Parent Page components.
- **SideNavigationComponent**: This component is common for all three routes. This is where I display the Side Navigation options and on click of it, change the route to display the appropriate Route component. For instance, clicking on Planets will change the route to /planets if it is not already so. Likewise, clicking on Favorites will change the route to /favorites.
- **PopUpModalComponent**: This is a Position fixed Alert component which is rendered in the middle of the Browser window. This component is triggered by clicking on the remove button in the Favorites Component.
- **ContentComponent**: This is a common component for all three routes. This component takes up the remaining 81.5% of the browser after the SideNavigationComponent. This component, based on the current Navigation option selected (Planets / Favorites), renders the appropriate Children components. If the route is /planets/:id, then this component also renders the Planet Detail Component on the right side of the page. which takes up 35% of the ContentComponent width. This component is where I decide, based on the navigation option selected coming from the props, to show the appropriate TableComponent or FavoriteListComponent.
- **TableComponent**: This is a common component for /planets and /planets/:id routes. This component receives as props the list of PlanetData data and Table Header Columns and it uses this to create a table. This component can easily be re-used to display a table using any other data. This component is also where I perform all operations related to table like Sorting.
- **TableHeaderComponent**: This component is used to render the Table Headers inside TableComponent. It also takes in as parameter all functions which depend on Table Header like Sorting. In this case, I have passed sortPlanetsList as param to this component, to be called when either Diameter or Population column header clicked on. This component is also responsible for displaying the appropriate Sorting Icon and Sorting direction for the particular column. I use two states to keep track of the current sorting column and direction.
- **TableRecordComponent**: This component is used to render the Table Planet Data values. On click of any record, this component will update the url to the appropriate Planet Detail route.
- **FavoriteIconComponent**: This component is responsible for showing the Favorite Star icon and also includes the logic of toggling favorite status of a Planet based on the user click operation.
- **FavoriteListComponent**: This component is a child of Content component and is rendered for /favorites route. This is a wrapper for displaying the list of FavoriteComponent and is responsible for showing the No favorites text if there are no favorite planets.
- **FavoriteComponent**: This component is used to display information about the Favorite Planets as a Card.

## Technical decisions I have made.

To have a better and clear implementation, I have used Redux toolkit to store the information about the List of Favorite Planets which the user has selected and to store the Sort Options which the user has applied.

- **Favorite Planets list**: This field is a List of PlanetStoreInfo object which includes id and name. I store this field in redux to have a centralized global state of the planets which the user has marked as favorite. When user, in /planets or /planets/:id route, toggles the favorite icon of a record, an action, which consists of planetId and name, is dispatched to update the global favoriteList state. It either adds that info to the FavoriteList or removes from it depending on the user behavior.
  On /favorites route, this list is fetched from redux and for every PlanetId present in it, I get the PlanetDetailData List by doing an api call. This PlanetDetailData is then displayed to the end user.
  On /favorites route, when user removes a Planet from favorite, an action which consists of planet name is dispatched to remove that planet from the redux Favorite list.
  When user navigates to /planets or /planets/:id route, this list is fetched to update the UI with the proper favorite status for each record.

- **SortOption**: This field is a SortOptionsStoreInfo object which consists of sort field and sort direction. I store this field in redux to have a centralized global state of the last Sorting operation which the user has applied. When user toggles the table header, an action which consists of the appropriate sort field and sort direction is dispatched to redux to update the global sortOption state.
  When user navigates to /planets or /planets/:id route from any other route, this sortOption state is fetched to perform the last sorting operation which the user has applied. Also, it updates the Table Header Column to show the appropriate sort direction icon for the column.

## Design pattern:

The design pattern I have used makes use of the Component architecture of React. I have used some components like PlanetsComponent, SideNavigationComponent and ContentComponent in all three routes. These three components are used to show the common content and functionality to be executed to display the appropriate content in the three routes.

## Work sequence:

- I did the setup of the star-wars-project repo and added typescript, jest for unit testing and eslint for code formatting.
- I created the three routes: /planets, /planets/:id and /favorites route to handle the three navigation routes required.
- I added code to make the api calls required for /planets and /planets/:id page. I also added the appropriate object conversion required to return the exact object which I need to show the content in the UI.
- I created a common component called PlanetsComponent to receive the api responses from it's parent route components.
- I created two children component called SideNavigationComponent and ContentComponent to show the two sections of the UI for /planets and /planets/:id page.
- In SideNavigationComponent, I added the two buttons and on click of that button, I added code to change the browser route to it's appropriate url.
- I then created the TableComponent, TableHeaderComponent and TableRecordComponent to show the table in UI. I rendered TableComponent inside ContentComponent and passed the api response to it.
- In TableComponent, I added code to sort the table based on column and direction applied from TableHeaderComponent, and update the TableRecordComponent with the new PlanetData List.
- In TableRecordComponent, I added FavoriteIconComponent to dynamically update the favorite status of a Planet based on user click behavior.
- In ContentComponent, I created the PlanetDetailComponent which is shown to the user on click of a particular record.
- In TableRecordComponent, I added code to change the route from /planets to /planets/:id as well as from planets/:oldId to planets/:newId depending on the Id of the Planet the user has clicked on.
- I did the setup of redux toolkit and planetReducer to save the Favorite Planets the user has selected.
- I made changes to the FavoriteIconComponent to update the global FavoriteList of Planets when the user has toggled with the favorite icon for each planet.
- In /favorites page component, I fetched the FavoriteList of planets and made the api calls to get the PlanetDetailData for each of the Favorite Planets.
- I then started creating the FavoriteListComponent to be rendered inside ContentComponent. I passed the PlanetDetailData list from the Parent route component to it. I made changes to the ContentComponent to show the appropriate UI based on the Navigation button selected (Planets or Favorites).
- Inside FavoriteListComponent, I added FavoriteComponent to display the PlanetDetailData of the Favorite Planet. I then render a List of Favorite Component for each of the Favorite Planet from the FavoriteListComponent param.
- Inside FavoriteComponent, I added functionality to remove a Planet as favorite. I created the Remove PopUpModalComponent to get the confirmation of the use to remove that Planet as Favorite. I then updated the redux store to remove that particular Planet from the FavoriteList.
- I added a global state in redux called sortOption to keep track of the last sorting operation the user has applied. In TableHeaderComponent, I made changes to update the global sortOption state to save the last sorting operation.
- I made changes to fetch this sortOption object in TableComponent on page load to sort the PlanetData list based on the last sorting operation. I also made changes to fetch this sortOption object in TableHeaderComponent on page load. to show the appropriate Sorting Direction icon for the particular Table Header. I made changes so that the above Sorting operation is applied when user navigates to /planets or /planets/:id url.

## Testing Strategy

I added jest and react-testing-library to perform Unit testing and Integration testing. I added unit tests to each component to perform some basic testing. I used jest and react-testing library to add integration tests for

- verifying correct UI is displayed for each page.
- verifying route is updated on record click and each page is rendered properly.
- verifying removing a Planet from favorite is working correctly and is updating the UI to reflect the correct Favorite List.
- verifying sorting functionality is sorting the PlanetData list and displaying it and the Sorting Direction icon correctly.
- verifying that on Favorites page, it shown a FavoriteCard for each of the items in the FavoriteList redux store.
- verifying that on page load, Sorting operation is applied to sort the PlanetData list based on the last Sorting operation applied and also to update the Table Header with the appropriate Sorting Direction icon.

I have writtent tests to complete 100% coverage of branches, functions, lines and statements in the code

## Alternatives I could have used.

Here, I use Redux to save the FavoriteList of Planets. Instead of that, I could use

- **LocalStorage**: Since the List does not occupy much size, I could save it in LocalStorage. This provides an additional benefit, along with maintaining a global value, that it can be persisted even after refreshing the page or closing or openeing the page again in the same browser.
- **BackendAPI**: I could save the FavoriteList to Backend which would save this in Database and the user would have the access to this same List from any browser.

In Client side API calls, I could implement react-query to cache the responses and invalidate them after some time. Currently, I use Fetch to cache the results of both the API's indefinitely.

## What things i could have improved on If i had more time

- To improve the coding standard, in addition to eslint which I have implemented in this project, I would set up and use SonarQube to reduce code duplications and code smells. I would also use Prettier to improve Code formatting.
- I would use Storybook to display the Components seperately like TableComponent or FavoriteComponent.
- I would implement the Mobile UI of this project to have a better user experience with a different design to display both the Planets, PlanetsDetail and Favorites page.
- I would implement Playwright testing to have End to End testing functionality for this application

## How to scale it in Future

- If the PlanetsList or FavoriteList is huge, I would implement Pagination or Infinte Scrolling using Virtualization to have a Good performance in the UI. This would allow me to display a huge number of records without affecting the load time and performance.
- For a better developer experience, I would use Material UI Library which provides ready made built-in components and better styles. This would save developer time in implementing the css ourselves.

* If there are other routes created which has the same SideNavigationComponent, then I would easily render it inside ContentComponent and handle the logic to show the new Route Components there. Since ContentComponent receives as props the navOptionSelected, in the routes page of the new route, I will pass the appropriate NavigationOption so that ContentComponent can easily render it.
* If the new Component is used to render a Table, then I would re-use the TableComponent by passing the custom TableHeaders and TableRecords data. I can also pass any other Components required to the new Component.

![Architecture Flowchart for Star wars project scaling](<Architecture Flowchart for Star wars project scaling.png>)
