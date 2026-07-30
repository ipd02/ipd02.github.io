---
title: "Master's thesis: an ethical-hacking methodology for IoT devices"
description: "A structured methodology for security-testing IoT devices, validated on a real consumer camera."
pubDate: 2025-10-01
tags: ["IoT", "Ethical hacking", "Methodology", "Thesis"]
---

For my Master's in Cybersecurity I built a structured methodology for
security-testing IoT devices — the kind of connected hardware that ships fast,
lives on home and office networks for years, and rarely gets a proper security
review.

## What I did

IoT devices don't fit neatly into general penetration-testing methodologies:
they combine firmware, several communication interfaces, and physical hardware,
each with its own attack surface and its own constraints. My goal was a
methodology that treats the device as a whole rather than testing pieces in
isolation.

I broke the work into three parts:

- **A device model** that splits any IoT device into three components —
  firmware, communication interfaces, and hardware — so each can be assessed
  systematically.
- **An attacker model** that classifies who might attack the device along two
  axes: how much access they have (from remote, to local network, to physical)
  and what privileges they hold. That lets the testing adapt to a realistic
  threat, not a worst-case fantasy.
- **A repeatable set of test cases** across all three components, organised into
  discovery, analysis, and exploitation phases.

## Validation

I validated the methodology end to end on a real consumer camera, working
through firmware, network communications, and the physical board. It held up in
practice and surfaced genuine weaknesses — which was the point: a methodology is
only worth something if it works on a device you didn't design it around.

The full methodology, attacker model, 38-test catalogue, validation tooling and
sanitized camera case study are published in the
[`iot-security-testing-methodology`](https://github.com/ipd02/iot-security-testing-methodology)
repository. This is the short version of what the project was and why it
mattered.
