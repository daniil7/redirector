export const isValidInternal = (internalString) => {
    const pattern = /^[a-zA-Z0-9\-]+$/;
    return !!pattern.test(internalString);
}

export const isValidUrl = (urlString) => {
	const urlPattern = new RegExp(
		"^(https?:\\/\\/)" + // validate protocol
			"((([a-zа-я\\d]([a-zа-я\\d-]*[a-zа-я\\d])*)\\.)+[a-zа-я]{2,}|" + // validate domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-zа-я\\d%_.~+]*)*" + // validate port and path
			"(\\?[;&a-zа-я\\d%_.~+=-]*)?" + // validate query string
			"(\\#[-a-zа-я\\d_]*)?$",
		"i",
	); // validate fragment locator
	return !!urlPattern.test(urlString);
};
