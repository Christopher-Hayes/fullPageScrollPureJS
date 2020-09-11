# Fullpage Scrolling with Vanilla JavaScript

#### Import css and javascript on your main html file

```html
<link
  rel="stylesheet"
  type="text/css"
  href="//stylesheet/full-page-scroll.min.css"
/>
<script src="//javascript/full-page-scroll.min.js"></script>
```

#### Use html sections to structure your fullpage flow

```html
<div id="main" class="scroll-container">
  <section>Section 1</section>
  <section>Section 2</section>
  <section>Section 3</section>
</div>
```

#### Call init method with configuration object

```html
<script type="text/javascript">
  new fullScroll({
    mainSelector: '.main-element',
    sectionSelector: 'section.scrollable',

    displayDots: true,
    dotsPosition: 'left',

    animateTime: 0.7,
    animateFunction: 'ease',
  });
</script>
```
#### Props

| Name               | Desc                              | Example                  |
| ------------------ | --------------------------------- | ------------------------ |
| mainSelector       | container selector                | .main-selector           |
| sectionSelector    | container selector                | section.section-selector |
| displayDots        | display dots navigation           | true                     |
| dotsPosition       | dots navigation position          | 'right'                  |
| animateTime        | time to complete scroll animation | 0.7                      |
| animateFunction    | css transition function           | 'ease'                   |

