<a name="readme-top"></a>




<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="public/favicon.ico" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Dreadit</h3>

  <p align="center">
    A Reddit clone built with React, Next, and TypeScript.
    <br />
    <br />
  
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About Dreadit

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

In an effort to build more full stack applications and increase my understanding of full stack web development, I have built Dreadit, a clone of the popular forum website Reddit. Dreadit has many features that I have learned a lot from including implementing:
* User authorization via NextAuth with Google
* Subscribe/Unsubscribe from subreddits
* Creation of subreddits
* Comment on subreddits with replies
* Post creation via Editor.js with options for:
          <ol>
    <ul>
        <li>Text</li>
         <li>Heading</li>
          <li>Link</li>
           <li>Image</li>
            <li>List</li>
             <li>Code</li>
              <li>Table</li>
      
    </ul>
  </ol>
* Infinite scrollling on post feeds
* Custom post feeds for authenticated users
* Responsive design for different viewport sizes
* Post voting
                  <ol>
    <ul>
       <li>Redis for caching high engagement posts</li>
      
    </ul>
  </ol>
* TanStack React-Query for data fetching
* Prisma ORM for database manipulation
* Images stored via uploadthing


This is not a comprehensive list of the features implemented in Dreadit. There are many more unlisted that bring it to life. 
I have documented every file with comments regarding the reasons for certain implementations and detailed functionality descriptions.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Prisma][Prisma]][Prisma-url]
* [![NextAuth][NextAuth]][NextAuth-url]
* [![TailwindCSS][TailwindCSS]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites


* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


2. Clone the repo
   ```sh
   git clone https://github.com/dcoope00/dreadit.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the project
   ```js
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- ROADMAP -->
## Roadmap

- [ ] Add Admin functionality
    - [ ] Remove posts
    - [ ] Subreddit creator delete subreddit
    - [ ] Subreddit creator customize subreddit
    - [ ] Ban users from subreddit

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- CONTACT -->
## Contact

Denver Cooper - dcoope00@gmail.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [shadcn/ui](https://ui.shadcn.com/)
* [TanstackQuery](https://tanstack.com/)
* [Zod](https://zod.dev/)
* [Upstash](https://console.upstash.com/login)
* [Img Shields](https://shields.io)
* [Lucide](https://lucide.dev/)
* [PlanetScale](https://planetscale.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-black?style=for-the-badge&logo=tailwindcss&logoColor=blue
[TailWind-url]: https://tailwindcss.com/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Prisma-url]: https://www.prisma.io/
[Prisma]: https://img.shields.io/badge/Prisma-darkgray?style=for-the-badge&logo=prisma&logoColor=black&link=https%3A%2F%2Fwww.prisma.io%2F
[NextAuth]:https://img.shields.io/badge/nextauth-purple?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMuNzE4NzUgMy45Mjk3MkM1LjYyNzg5IDMuMzY3MzMgOC40NTU2OCAyLjUyNDExIDkuNjQ4MjggMi4xNjgxMkMxMC4wMTczIDIuMDU3OTcgMTAuNDA3NSAyLjA1NzExIDEwLjc3NzEgMi4xNjUzM0MxMS45MjYgMi41MDE3MyAxNC41OTg0IDMuMjg3ODMgMTYuNjY0OCAzLjkyMzQ5QzE3LjA4MjggNC4wNTIwOSAxNy4zNjc5IDQuNDQ1OTMgMTcuMzU3NSA0Ljg4MzE5QzE3LjExODggMTQuOTg2NyAxMi4wMTk2IDE3LjQxMDUgMTAuNTg0MiAxNy44OTM2QzEwLjMzODggMTcuOTc2MiAxMC4wODM3IDE3Ljk3NjQgOS44MzgwMiAxNy44OTQ1QzguMzk1NjcgMTcuNDEzNyAzLjI1NDIxIDE0Ljk5NTEgMy4wMDkwNyA0Ljg5NzE0QzIuOTk4MyA0LjQ1MzE3IDMuMjkyNzYgNC4wNTUyMSAzLjcxODc1IDMuOTI5NzJaIiBmaWxsPSIjRDlEOUQ5Ii8%2BCjxtYXNrIGlkPSJtYXNrMF8xNTZfMjUyIiBzdHlsZT0ibWFzay10eXBlOmFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIzIiB5PSIyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTYiPgo8cGF0aCBkPSJNMy43MTg3NSAzLjkyOTcyQzUuNjI3ODkgMy4zNjczMyA4LjQ1NTY4IDIuNTI0MTEgOS42NDgyOCAyLjE2ODEyQzEwLjAxNzMgMi4wNTc5NyAxMC40MDc1IDIuMDU3MTEgMTAuNzc3MSAyLjE2NTMzQzExLjkyNiAyLjUwMTczIDE0LjU5ODQgMy4yODc4MyAxNi42NjQ4IDMuOTIzNDlDMTcuMDgyOCA0LjA1MjA5IDE3LjM2NzkgNC40NDU5MyAxNy4zNTc1IDQuODgzMTlDMTcuMTE4OCAxNC45ODY3IDEyLjAxOTYgMTcuNDEwNSAxMC41ODQyIDE3Ljg5MzZDMTAuMzM4OCAxNy45NzYyIDEwLjA4MzcgMTcuOTc2NCA5LjgzODAyIDE3Ljg5NDVDOC4zOTU2NyAxNy40MTM3IDMuMjU0MjEgMTQuOTk1MSAzLjAwOTA3IDQuODk3MTRDMi45OTgzIDQuNDUzMTcgMy4yOTI3NiA0LjA1NTIxIDMuNzE4NzUgMy45Mjk3MloiIGZpbGw9IiNEOUQ5RDkiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2swXzE1Nl8yNTIpIj4KPHBhdGggZD0iTTEwLjIxMTIgOS43NzQ2NUwxMC4wOTg2IDEuNzE4MzFMMTcuODE2OSAzLjgwMjgyTDEwLjIxMTIgOS43NzQ2NVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xNTZfMjUyKSIvPgo8cGF0aCBkPSJNMTAuMjExMyA5Ljc3NDY1VjJMMi44MzA5OCAzLjk3MTgzTDEuODE2ODkgOC43NjA1Nkw1LjAyODE2IDEzLjc3NDZMMTAuMjExMyA5Ljc3NDY1WiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzE1Nl8yNTIpIi8%2BCjxwYXRoIGQ9Ik0xNy41OTE1IDMuOTcxODNMNC45MTU0NyAxMy43NzQ2VjE4LjIyNTRIMTcuNDIyNUwxNy41OTE1IDMuOTcxODNaIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXJfMTU2XzI1MikiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE1Nl8yNTIiIHgxPSIxMC4yMTEyIiB5MT0iMiIgeDI9IjE1LjYxOTciIHkyPSI1LjU0OTMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzE5QUFFOCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxRUE1RjEiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzE1Nl8yNTIiIHgxPSIzLjA1NjMzIiB5MT0iNC4xNDA4NSIgeDI9IjEwLjIxMTMiIHkyPSI5LjY2MTk3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI%2BCjxzdG9wIHN0b3AtY29sb3I9IiMyQkUyQjgiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTlCOUUzIi8%2BCjwvbGluZWFyR3JhZGllbnQ%2BCjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl8xNTZfMjUyIiB4MT0iMTcuMzA5OCIgeTE9IjQuMDI4MTciIHgyPSI3Ljk1NzcyIiB5Mj0iMTYuOTg1OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjOTI1Q0RGIi8%2BCjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0NDNDJFNSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM%2BCjwvc3ZnPgo%3D
[NextAuth-url]: https://next-auth.js.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
