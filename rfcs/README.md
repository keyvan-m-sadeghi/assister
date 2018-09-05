# Assister RFCs
[Assister RFCs]: #assister-rfcs

Many changes, including bug fixes and documentation improvements can be
implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are "substantial", and we ask that these be put through
a bit of a design process and produce a consensus among the community.

The "RFC" (request for comments) process is intended to provide a consistent
and controlled path for new features to enter the project, so that all
stakeholders can be confident about the direction the project is evolving in.

## What the process is
[What the process is]: #what-the-process-is

In short, to get a major feature added to the project, one must first get the RFC
merged into the repository as a markdown file. At that point the RFC is
"active" and may be implemented with the goal of eventual inclusion.

- Create an issue on the assister
  [repository](https://github.com/assister-ai/assister), this would be
  the "Master Issue" corresponding to the feature you are proposing.
  - List the requirements that the feature would be addressing. Reference any
    previous relating issues in master issue's body or comments. Some
    preliminary discussion will likely take place within the master issue.
  - Alternatively, you can select an existing issue as the master issue for the
    feature.
- Fork the assister repository.
- Copy [`rfcs/template.md`](
  https://github.com/assister-ai/assister/blob/master/rfcs/template.md)
  to `rfcs/text/my-feature/README.md` (where "my-feature" is a descriptive
  short name for the feature).
- Put any accompanying resources (pictures, etc.) in `rfcs/text/my-feature/`,
  you can refer to these in the text.
- Fill in the RFC. Put care into the details: RFCs that do not present
  convincing motivation, demonstrate understanding of the impact of the
  design, or are disingenuous about the drawbacks or alternatives tend to be
  poorly-received.
- Submit a pull request. As a pull request the RFC will receive design
  feedback from the larger community, and the author should be prepared to
  revise it in response.  
- Build consensus and integrate feedback. RFCs that have broad support are
  much more likely to make progress than those that don't receive any
  comments. Feel free to reach out to the RFC assignee in particular to get
  help identifying stakeholders and obstacles.
- The community will discuss the RFC pull request, as much as possible in the
  comment thread of the pull request itself. Offline discussion will be
  summarized on the pull request comment thread.
- RFCs rarely go through this process unchanged, especially as alternatives
  and drawbacks are shown. You can make edits, big and small, to the RFC to
  clarify or change the design, but make changes as new commits to the pull
  request, and leave a comment on the pull request explaining your changes.
  Specifically, do not squash or rebase commits after they are visible on the
  pull request.
- At some point, a member will propose a "motion for final comment period"
  (FCP), along with a *disposition* for the RFC (merge, close, or postpone).
  - For RFCs with lengthy discussion, the motion to FCP is usually preceded by
    a *summary comment* trying to lay out the current state of the discussion
    and major tradeoffs/points of disagreement.
- The FCP lasts ten calendar days, so that it is open for at least 5 business
  days. This way all
  stakeholders have a chance to lodge any final objections before a decision
  is reached.
- In most cases, the FCP period is quiet, and the RFC is either merged or
  closed. However, sometimes substantial new arguments or ideas are raised,
  the FCP is canceled, and the RFC goes back into development mode.
- Once active, the RFC is listed on the "RFC table" (next section).
- Following the implementation and inclusion, the master issue will be closed
  and the version number that contains the feature is put on the RFC table.

**Assister's RFC process owes its inspiration to the [Rust RFC process](https://github.com/rust-lang/rfcs)**

## RFC table
[RFC table]: #rfc-table

This table lists the assister RFCs in chronological order. "Champions" are
the people directly responsible for following on RFC's implementation. Most
likely the the authors themselves. "Docs" and "Tests" will get a
:heavy_check_mark: when they are created.

[keyvan-m-sadeghi]: https://github.com/keyvan-m-sadeghi
[hamidreza-mahyar]: https://github.com/hamidreza-mahyar
[sasanahmadi]: https://github.com/sasanahmadi

| Date       | Title       | Authors | Champions | Tests | Docs | Included in |
| ---------- | ----------- | ------- | --------- | ----- | ---- | ----------- |
| 2018-07-22 | [Assister - The Concept](https://github.com/assister-ai/assister/blob/master/rfcs/text/assister-conception) | [keyvan-m-sadeghi] | [hamidreza-mahyar], [sasanahmadi] | | | |
