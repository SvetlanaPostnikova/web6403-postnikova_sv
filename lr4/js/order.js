class Order {
    constructor(formData) {
        this.name = formData.get("name").trim();
        this.email = formData.get("email").trim();
        this.description = formData.get("description").trim();
        this.consent = formData.get("consent") === "yes";
    }

    printToConsole() {
        console.log([
            "Заявка на украшение",
            `Имя: ${this.name}`,
            `Почта: ${this.email}`,
            `Описание: ${this.description}`,
            `Согласие: ${this.consent ? "да" : "нет"}`
        ].join("\n"));
    }
}

const orderForm = document.querySelector("#order-form");
const orderStatus = document.querySelector("#order-status");
const submitButton = orderForm.querySelector("button");

orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const order = new Order(formData);

    if (!order.name || !order.description) {
        orderStatus.textContent = "Заполните имя и описание украшения.";
        return;
    }

    order.printToConsole();
    submitButton.disabled = true;
    orderStatus.textContent = "Отправляем заявку…";

    try {
        const response = await fetch(orderForm.action, {
            method: "POST",
            body: new URLSearchParams(formData)
        });

        if (!response.ok) {
            orderStatus.textContent = "Сервер отклонил заявку. Проверьте введённые данные.";
            return;
        }

        orderForm.reset();
        orderStatus.textContent = "Сервер принял заявку.";
    } catch {
        orderStatus.textContent = "Не удалось связаться с сервером. Проверьте, что он запущен.";
    } finally {
        submitButton.disabled = false;
    }
});
