# Fullpage Scrolling with Vanilla JavaScript

#### Call init method with configuration object

```html
<script type="text/javascript">
  new fullScroll({
    mainSelector: '.main-element',
    sectionSelector: 'section.scrollable',

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
| animateTime        | time to complete scroll animation | 0.7                      |
| animateFunction    | css transition function           | 'ease'                   |

