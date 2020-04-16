@import "../../styles/mixins/responsive";

.wrapper {
  grid-column: 1 / span 6;

  @include mobile-landscape {
    grid-column: 1 / span 6;
  }

  @include tablet {
    grid-column: 1 / span 12;
  }

  @include tablet-landscape {
    grid-column: 1 / span 16;
  }

  @include desktop {
    grid-column: 1 / span 16;
  }

  @include large-desktop {
    grid-column: 1 / span 16;
  }
}
