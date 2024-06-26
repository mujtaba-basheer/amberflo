window.addEventListener("load", () => {
  const pricingCardNew = document.querySelector("div.pricing-card.new");
  const pricingCardBig = document.querySelector("div.pricing-card.big");

  if (pricingCardNew) {
    const textData = [
      [
        "5 million events",
        "7.5 million events",
        "10 million events",
        "15 million events",
        "15+ million events",
      ],
      [
        `Price per million (unit price): $70`,
        `Price per million (unit price): $70`,
        `Price per million (unit price): $65`,
        `Price per million (unit price): $65`,
        `<span class="value-change">Larger plans</span> are available. <a href="#" class="contact-us-now">Chat with us</a>`,
      ],
    ];
    const pricingData = {
      base: [350, 525, 650, 975, 975],
      withAnalytics: [700, 1049, 1349, 1949, 1949],
    };

    pricingCardNew.querySelector("form").reset();
    const checkboxEl = pricingCardNew.querySelector(
      'div.checkbox-wrap input[type="checkbox"]'
    );
    const priceEl = pricingCardNew.querySelector("span#display");
    const rangeSliderEl = pricingCardNew.querySelector(
      "div.fs-rangeslider-handle"
    );
    const pointerEls = pricingCardNew.querySelectorAll(
      "div.pointer-wrap.top .pointers:not(.hide) div"
    );

    const state = {
      price: 0,
      checked: checkboxEl.checked,
      currentStep: 0,
    };

    const updatePrice = (val) => {
      const formattedPrice =
        typeof val === "string"
          ? val
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
              currency: "USD",
              signDisplay: "never",
            })
              .format(val)
              .substring(1);

      priceEl.textContent = formattedPrice;
    };

    const updateText = (step) => {
      for (let i = 0; i < textData.length; i++) {
        const pointerEl = pointerEls.item(i);
        const texts = textData[i];
        pointerEl.innerHTML = texts[step];
      }
    };

    const onCheckboxChange = (checked) => {
      const { currentStep } = state;
      const price =
        pricingData[checked ? "withAnalytics" : "base"][currentStep];
      updatePrice(price);
    };

    checkboxEl.addEventListener("change", (ev) => {
      const { checked } = ev.target;
      onCheckboxChange(checked);
      state.checked = checked;
    });

    const onPriceChange = (mutations) => {
      for (const mutation of mutations) {
        const { type, target } = mutation;
        if (type === "attributes") {
          const step = +target.getAttribute("aria-valuenow") - 1;
          state.currentStep = step;

          const price =
            pricingData[state.checked ? "withAnalytics" : "base"][step];

          updatePrice(price);
          updateText(step);
        }
      }
    };
    const observer = new MutationObserver(onPriceChange);
    observer.observe(rangeSliderEl, {
      subtree: false,
      childList: false,
      attributes: true,
      attributeFilter: ["aria-valuenow"],
    });
  }

  if (pricingCardBig) {
    const textData = [
      [
        "Up to $200k of billing per month",
        "Up to $500k of billing per month",
        "Up to $1M of billing per month",
        "Up to $5M of billing per month",
        "Up to $10M of billing per month",
      ],
    ];
    const pricingData = {
      base: [1500, 3750, 7500, 37500, 75000],
      withAnalytics: [700, 1049, 1349, 1949, 1949],
    };

    pricingCardBig.querySelector("form").reset();
    const checkboxEl = pricingCardBig.querySelector(
      'div.checkbox-wrap input[type="checkbox"]'
    );
    const priceEl = pricingCardBig.querySelector("span#display");
    const rangeSliderEl = pricingCardBig.querySelector(
      "div.fs-rangeslider-handle"
    );
    const pointerEls = pricingCardBig.querySelectorAll(
      "div.pointer-wrap.top .pointers:not(.hide) div"
    );

    const state = {
      price: 0,
      checked: checkboxEl.checked,
      currentStep: 0,
    };

    const updatePrice = (val) => {
      const formattedPrice =
        typeof val === "string"
          ? val
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
              currency: "USD",
              signDisplay: "never",
            })
              .format(val)
              .substring(1);

      priceEl.textContent = formattedPrice;
    };

    const updateText = (step) => {
      for (let i = 0; i < textData.length; i++) {
        const pointerEl = pointerEls.item(i);
        const texts = textData[i];
        pointerEl.textContent = texts[step];
      }
    };

    const onCheckboxChange = (checked) => {
      const { currentStep } = state;
      const price =
        pricingData[checked ? "withAnalytics" : "base"][currentStep];
      updatePrice(price);
    };

    checkboxEl.addEventListener("change", (ev) => {
      const { checked } = ev.target;
      onCheckboxChange(checked);
      state.checked = checked;
    });

    const onPriceChange = (mutations) => {
      for (const mutation of mutations) {
        console.log("mutation:", mutation);
        const { type, target } = mutation;
        if (type === "attributes") {
          const step = +target.getAttribute("aria-valuenow") - 1;
          state.currentStep = step;

          const price =
            pricingData[state.checked ? "withAnalytics" : "base"][step];

          updatePrice(price);
          updateText(step);
        }
      }
    };
    const observer = new MutationObserver(onPriceChange);
    observer.observe(rangeSliderEl, {
      subtree: false,
      childList: false,
      attributes: true,
      attributeFilter: ["aria-valuenow"],
    });
  }
});
