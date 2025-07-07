# Mario Kart Geoguessr Helper

This is a simple web application designed to assist with the Mario Kart Geoguessr stream by Raysfire. It provides an easy-to-use interface for managing and displaying image submissions and hint levels during the game, addressing the challenges of on-the-fly updates.

Feel free to review any code before running it for your own safety.
## How to Use

### Getting Started

1.  **Install dependencies:** Open your terminal in the project's root directory and run the following command to install the necessary packages.
    ```bash
    npm install
    ```

2.  **Run the application:** Start the local development server.
    ```bash
    npm run dev
    ```

3.  **Open in browser:** Open the local URL that the previous command provides in your console (e.g., `http://localhost:5173`).
4. Sample Data has been added under `sample-data/user.json`.

### Creating and Managing Data Files

The data file contains all the user submissions, including links to their hint images.

1.  From the home page, click on **Create File** to navigate to the file creation page.
2.  For each submission you want to add:
    *   Fill in the **User's Name**.
    *   Paste the image links for each difficulty level: **Hard**, **Medium**, **Easy**, and **Reveal**.
    > **Tip:** To get a direct image link from a platform like Discord, right-click the image and select "Copy Link". To avoid spoilers, it's best if someone else does this.
    *   Click the **Add** button. The submission will appear in the list below.
3.  Once all submissions have been added, click the **Create** button to download the `users.json` data file to your computer.

### Editing an Existing Data File

You can also load and modify an existing `users.json` file.

1.  On the "Create File" page, click the **Load** button and select your `users.json` file.
2.  The submissions from the file will populate the list.
3.  Click on the name of any submission to load its details into the input fields.
4.  Make your desired changes and click the **Update** button.
5.  After you've finished editing, click **Create** again to save a new `users.json` file with your updates.

### Running the Game

1.  On the home page, click **Load File** and select the `users.json` file you created.
2.  A dropdown list of all submissions will appear under the image. The first user will automatically be selected.
3.  Use the **Easy**, **Medium**, **Hard**, and **Reveal** buttons to display the appropriate hint level.
4.  You're all set!
