1. SecureVault Explorer is a frontend web application that I built entirely with React  and CSS, no other libraries. Its a fully interactive, keyboard-accessible file explorer designed for enterprises like law firms, financial institutions and any other organization.

The application is deployed and live on Vercel to automatically 
rebuild and publish it every time any new code is pushed to GitHub.

2. Live link: https://securevault-dashboard-project.vercel.app/



3. Figma link: https://www.figma.com/design/CyVJO6qaAzra877rGI6RkZ/SECUREVAULT-DESIGN-SYSTEM?node-id=1-2&t=fvxHe0WhN6jRi3UJ-1


4. Setup instructions:
- Requirements: Node.js v18+
- Clone the Github repository: https://github.com/Aristide000/securevault-dashboard-project.git
- Navigate into the project folder: securevault-dashboard-project
- Install dependencies: npm install
- Start the development server: npm run dev
- Then open http://localhost:5173 in your browser 


5. Recursive strategy explanation:  For the recursive strategy, the folder tree is built using a single react component called "TreeNode" that 
renders itself. When it encounters a folder, it checks if that folder is open 
and if so, loops through its children. each child renders another treeNode. 

This continues as deep as the data goes without any extra logic needed
Each node only manages its own expand/collapse state by simply handling itself and let its children 
handle themselves. This makes the component work correctly whether the 
structure has 2 levels or even 20.



6. Wildcard feature explanation: So my wild feature is this:  I added a "View one folder at a time" toggle in the sidebar. I noticed that 
opening multiple folders at the same time creates visual clutter (As a music producer, i know his feature in FL studio) especially 
for users managing large numbers of files. 

For example: If a lawyer is navigating many years of 
active cases, he does not want multiple folders open competing for attention.

When the toggle is on, opening a folder automatically closes any other open 
folders at the same level. Each level manages its own siblings independently, 
so opening a sub-folder does not accidentally close its parent folder above it.

This feature was not requested in the brief but i added it because it solves a 
real navigation problem that shows up the moment a user has more than 3 or 
4 folders open at once.