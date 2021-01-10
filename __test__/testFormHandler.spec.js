import { handleSubmit } from "../src/client/js/formHandler"

document.body.innerHTML = `
<main>
<section>
    <form class="" onsubmit="return Client.handleSubmit(event)">
        <p>Please enter url or text to perform sentiment analysis:</p>
        <input id="url" type="text" name="input" value="" placeholder="https://example.com">
        <input id="text" type="text" name="input" value="" placeholder="Example text">
        <div class="loader" style="display: none;"></div>
        <input type="submit" name="" value="Submit" onclick="return Client.handleSubmit(event)"
            onsubmit="return handleSubmit(event)">
    </form>
</section>

<section>
    <strong>Result:</strong>
    <div id="results"></div>
</section>
</main>
  `;

describe("Testing the submit functionality", () => {

    it('"Testing the handleSubmit() function', () => {

        document.getElementById('text').value = "test";
        const event = { preventDefault: () => { } };
        global.fetch = jest.fn(() => Promise.resolve({ json: () => ''}))
        handleSubmit(event); expect(global.fetch).toHaveBeenCalled();

    });

});


