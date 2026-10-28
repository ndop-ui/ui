import { NgComponentOutlet } from '@angular/common';
import { Component, input, type Type } from '@angular/core';
import { StaticHtml } from '../site/static-html';

/**
 * A live example on a component page: rendered inline and hydrated when it
 * scrolls into view (ADR-0016, "Previews"), with its code attached below.
 * The site header's theme and direction toggles apply to it like to the
 * rest of the page (amendment 5).
 */
@Component({
  selector: 'docs-example-preview',
  imports: [NgComponentOutlet, StaticHtml],
  host: { class: 'block' },
  template: `
    <figure
      class="not-prose overflow-hidden rounded-xl border"
      [attr.aria-label]="title()"
    >
      <!-- The example's own element is a full-width, centred column, so a
           width like the slider's w-3/5 or a card's w-full max-w-sm
           resolves against the preview, as in shadcn/ui's, instead of
           against an element shrunk to its content. -->
      <div
        class="flex min-h-[350px] items-center justify-center bg-background p-10 text-foreground *:flex *:w-full *:flex-col *:items-center"
      >
        @if (component(); as type) {
          @defer (on immediate; hydrate on viewport) {
            <ng-container *ngComponentOutlet="type" />
          }
        }
      </div>
      <div [docsHtml]="codeHtml()"></div>
    </figure>
  `,
})
export class ExamplePreview {
  /** The example's title, for the card's label. */
  readonly title = input.required<string>();
  /** The example's component, loaded with the page's data. */
  readonly component = input.required<Type<unknown> | undefined>();
  /** The example's source, highlighted at build time. */
  readonly codeHtml = input.required<string>();
}
